import { Favor, User, Book } from '../db/models/index.js';

/**
 * Контроллер для работы с избранным
 * Обрабатывает операции добавления/удаления книг в избранное
 */
class FavorController {
  constructor(dependencies = {}) {
    this.Favor = dependencies.Favor || Favor;
    this.User = dependencies.User || User;
    this.Book = dependencies.Book || Book;
  }

  /**
   * Получить все избранное пользователя
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAll(req, res) {
    try {
      const { userId } = req.query;

      const where = {};
      if (userId) {
        where.userId = userId;
      }

      const favors = await this.Favor.findAll({
        where,
        include: [
          {
            model: this.User,
            as: 'user',
            attributes: ['id', 'userName', 'userSurname', 'userLogin'],
          },
          {
            model: this.Book,
            as: 'book',
            attributes: ['id', 'bookTitle', 'bookDescription', 'bookImageUrl'],
          },
        ],
      });

      return res.status(200).json(favors);
    } catch (error) {
      console.error('Get all favors error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Получить избранное по ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getById(req, res) {
    try {
      const { id } = req.params;

      const favor = await this.Favor.findByPk(id, {
        include: [
          {
            model: this.User,
            as: 'user',
            attributes: ['id', 'userName', 'userSurname', 'userLogin'],
          },
          {
            model: this.Book,
            as: 'book',
            attributes: ['id', 'bookTitle', 'bookDescription', 'bookImageUrl'],
          },
        ],
      });

      if (!favor) {
        return res.status(404).json({ status: false, error: 'Favor not found' });
      }

      return res.status(200).json(favor);
    } catch (error) {
      console.error('Get favor by id error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Добавить книгу в избранное
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async create(req, res) {
    try {
      const { userId, bookId } = req.body;

      // Валидация обязательных полей
      if (!userId || !bookId) {
        return res.status(400).json({ status: false, error: 'userId and bookId are required' });
      }

      // Проверка существования пользователя и книги
      const user = await this.User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ status: false, error: 'User not found' });
      }

      const book = await this.Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ status: false, error: 'Book not found' });
      }

      // Проверка, не добавлена ли уже книга в избранное
      const existingFavor = await this.Favor.findOne({
        where: { userId, bookId },
      });

      if (existingFavor) {
        return res.status(409).json({ status: false, error: 'Book already in favorites' });
      }

      const favor = await this.Favor.create({
        userId,
        bookId,
      });

      const favorWithRelations = await this.Favor.findByPk(favor.id, {
        include: [
          {
            model: this.User,
            as: 'user',
            attributes: ['id', 'userName', 'userSurname', 'userLogin'],
          },
          {
            model: this.Book,
            as: 'book',
            attributes: ['id', 'bookTitle', 'bookDescription', 'bookImageUrl'],
          },
        ],
      });

      return res.status(201).json(favorWithRelations);
    } catch (error) {
      console.error('Create favor error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Удалить книгу из избранного
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const favor = await this.Favor.findByPk(id);
      if (!favor) {
        return res.status(404).json({ status: false, error: 'Favor not found' });
      }

      await favor.destroy();

      return res.status(200).json({ status: true });
    } catch (error) {
      console.error('Delete favor error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Удалить книгу из избранного по userId и bookId
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteByUserAndBook(req, res) {
    try {
      const { userId, bookId } = req.body;

      if (!userId || !bookId) {
        return res.status(400).json({ status: false, error: 'userId and bookId are required' });
      }

      const favor = await this.Favor.findOne({
        where: { userId, bookId },
      });

      if (!favor) {
        return res.status(404).json({ status: false, error: 'Favor not found' });
      }

      await favor.destroy();

      return res.status(200).json({ status: true });
    } catch (error) {
      console.error('Delete favor by user and book error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }
}

export default new FavorController();

