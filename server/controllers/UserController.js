import bcrypt from 'bcrypt';
import { User } from '../db/models/index.js';
import generateTokens from '../utils/generateTokens.js';
import cookiesConfig from '../config/cookiesConfig.js';

/**
 * Контроллер для работы с пользователями
 * Обрабатывает регистрацию, вход, выход и проверку токена
 */
class UserController {
  constructor(dependencies = {}) {
    // Dependency Injection - зависимости через конструктор
    // Это позволяет легко тестировать и мокировать зависимости
    this.User = dependencies.User || User;
    this.bcrypt = dependencies.bcrypt || bcrypt;
    this.generateTokens = dependencies.generateTokens || generateTokens;
    this.cookiesConfig = dependencies.cookiesConfig || cookiesConfig;
  }

  /**
   * Регистрация нового пользователя
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async signup(req, res) {
    try {
      const { userName, userSurname, userLogin, userEmail, userPassword } = req.body;

      // Валидация обязательных полей
      if (!userName || !userSurname || !userLogin || !userEmail || !userPassword) {
        return res.status(400).json({ status: false, error: 'All fields are required' });
      }

      // Проверка существования пользователя
      const [user, created] = await this.User.findOrCreate({
        where: { userEmail },
        defaults: {
          userName,
          userSurname,
          userLogin,
          userPassword: await this.bcrypt.hash(userPassword, 10),
        },
      });

      if (!created) {
        return res.status(403).json({ status: false, error: 'User already exists' });
      }

      // Подготовка данных пользователя для ответа
      const plainUser = user.get();
      delete plainUser.userPassword;

      // Генерация токенов
      const { accessToken, refreshToken } = this.generateTokens({ user: plainUser });

      // Установка refresh token в cookie и отправка ответа
      return res
        .cookie('refreshToken', refreshToken, this.cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user: plainUser });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Вход пользователя в систему
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async login(req, res) {
    try {
      const { userEmail, userPassword } = req.body;

      // Валидация обязательных полей
      if (!userEmail || !userPassword) {
        return res.status(400).json({ status: false, error: 'Email and password are required' });
      }

      // Поиск пользователя по email
      const user = await this.User.findOne({
        where: { userEmail },
      });

      if (!user) {
        return res.status(401).json({ status: false, error: 'User not found' });
      }

      // Проверка пароля
      const isPasswordValid = await this.bcrypt.compare(userPassword, user.userPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ status: false, error: 'Incorrect password' });
      }

      // Подготовка данных пользователя для ответа
      const plainUser = user.get();
      delete plainUser.userPassword;

      // Генерация токенов
      const { accessToken, refreshToken } = this.generateTokens({ user: plainUser });

      // Установка refresh token в cookie и отправка ответа
      return res
        .cookie('refreshToken', refreshToken, this.cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user: plainUser });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Выход пользователя из системы
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  logout(req, res) {
    try {
      res.clearCookie('refreshToken').status(200).json({ status: true });
    } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Проверка валидности refresh token
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  check(req, res) {
    try {
      // Пользователь уже проверен middleware verifyRefreshToken
      return res.status(200).json({ user: res.locals.user, accessToken: '' });
    } catch (error) {
      console.error('Check error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }
}

export default new UserController();
