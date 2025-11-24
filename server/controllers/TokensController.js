import generateTokens from '../utils/generateTokens.js';
import cookiesConfig from '../config/cookiesConfig.js';

/**
 * Контроллер для работы с токенами
 * Обрабатывает обновление access и refresh токенов
 */
class TokensController {
  constructor(dependencies = {}) {
    // Dependency Injection - зависимости через конструктор
    // Это позволяет легко тестировать и мокировать зависимости
    this.generateTokens = dependencies.generateTokens || generateTokens;
    this.cookiesConfig = dependencies.cookiesConfig || cookiesConfig;
  }

  /**
   * Обновление токенов (access и refresh)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async refresh(req, res) {
    try {
      // Пользователь уже проверен middleware verifyRefreshToken
      const { user } = res.locals;

      // Генерация новых токенов
      const { accessToken, refreshToken } = this.generateTokens({ user });

      // Установка нового refresh token в cookie и отправка ответа
      return res
        .cookie('refreshToken', refreshToken, this.cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user });
    } catch (error) {
      console.error('Token refresh error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }
}

export default new TokensController();
