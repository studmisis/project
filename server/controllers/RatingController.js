import { Rating, User, Book } from '../db/models/index.js';

/**
 * Контроллер для работы с рейтингами
 * Обрабатывает CRUD операции для рейтингов
 */
class RatingController {
  constructor(dependencies = {}) {
    this.Rating = dependencies.Rating || Rating;
    this.User = dependencies.User || User;
    this.Book = dependencies.Book || Book;
  }

  /**
   * Получить все рейтинги
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAll(req, res) {
    try {
      const { bookId, userId } = req.query;

      const where = {};
      if (bookId) {
        where.bookId = bookId;
      }
      if (userId) {
        where.userId = userId;
      }

      const ratings = await this.Rating.findAll({
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
            attributes: ['id', 'bookTitle'],
          },
        ],
      });

      return res.status(200).json(ratings);
    } catch (error) {
      console.error('Get all ratings error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Получить рейтинг по ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getById(req, res) {
    try {
      const { id } = req.params;

      const rating = await this.Rating.findByPk(id, {
        include: [
          {
            model: this.User,
            as: 'user',
            attributes: ['id', 'userName', 'userSurname', 'userLogin'],
          },
          {
            model: this.Book,
            as: 'book',
            attributes: ['id', 'bookTitle'],
          },
        ],
      });

      if (!rating) {
        return res.status(404).json({ status: false, error: 'Rating not found' });
      }

      return res.status(200).json(rating);
    } catch (error) {
      console.error('Get rating by id error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Получить средний рейтинг книги
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAverageByBookId(req, res) {
    try {
      const { bookId } = req.params;

      const ratings = await this.Rating.findAll({
        where: { bookId },
        attributes: ['rating'],
      });

      if (ratings.length === 0) {
        return res.status(200).json({ averageRating: 0, count: 0 });
      }

      const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
      const average = sum / ratings.length;

      return res.status(200).json({
        averageRating: Math.round(average * 10) / 10, // Округление до 1 знака
        count: ratings.length,
      });
    } catch (error) {
      console.error('Get average rating error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Создать или обновить рейтинг
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createOrUpdate(req, res) {
    try {
      const { userId, bookId, rating } = req.body;

      // Валидация обязательных полей
      if (!userId || !bookId || !rating) {
        return res.status(400).json({ status: false, error: 'userId, bookId and rating are required' });
      }

      // Валидация рейтинга (1-5)
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ status: false, error: 'Rating must be between 1 and 5' });
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

      // Поиск существующего рейтинга
      const [existingRating, created] = await this.Rating.findOrCreate({
        where: { userId, bookId },
        defaults: { rating },
      });

      // Если рейтинг уже существует, обновляем его
      if (!created) {
        await existingRating.update({ rating });
      }

      const ratingWithRelations = await this.Rating.findByPk(existingRating.id, {
        include: [
          {
            model: this.User,
            as: 'user',
            attributes: ['id', 'userName', 'userSurname', 'userLogin'],
          },
          {
            model: this.Book,
            as: 'book',
            attributes: ['id', 'bookTitle'],
          },
        ],
      });

      return res.status(created ? 201 : 200).json(ratingWithRelations);
    } catch (error) {
      console.error('Create or update rating error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Удалить рейтинг
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const rating = await this.Rating.findByPk(id);
      if (!rating) {
        return res.status(404).json({ status: false, error: 'Rating not found' });
      }

      await rating.destroy();

      return res.status(200).json({ status: true });
    } catch (error) {
      console.error('Delete rating error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }
}

export default new RatingController();

