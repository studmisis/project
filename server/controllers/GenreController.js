import { Genre, Book } from '../db/models/index.js';

/**
 * Контроллер для работы с жанрами
 * Обрабатывает CRUD операции для жанров
 */
class GenreController {
  constructor(dependencies = {}) {
    this.Genre = dependencies.Genre || Genre;
    this.Book = dependencies.Book || Book;
  }

  /**
   * Получить все жанры
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAll(req, res) {
    try {
      const genres = await this.Genre.findAll({
        include: [
          {
            model: this.Book,
            as: 'books',
            attributes: ['id', 'bookTitle', 'bookImageUrl'],
          },
        ],
      });

      return res.status(200).json(genres);
    } catch (error) {
      console.error('Get all genres error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Получить жанр по ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getById(req, res) {
    try {
      const { id } = req.params;

      const genre = await this.Genre.findByPk(id, {
        include: [
          {
            model: this.Book,
            as: 'books',
            attributes: ['id', 'bookTitle', 'bookDescription', 'bookImageUrl', 'bookDone'],
          },
        ],
      });

      if (!genre) {
        return res.status(404).json({ status: false, error: 'Genre not found' });
      }

      return res.status(200).json(genre);
    } catch (error) {
      console.error('Get genre by id error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Создать новый жанр
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async create(req, res) {
    try {
      const { genreName, genreDescription } = req.body;

      // Валидация обязательных полей
      if (!genreName) {
        return res.status(400).json({ status: false, error: 'genreName is required' });
      }

      const genre = await this.Genre.create({
        genreName,
        genreDescription: genreDescription || null,
      });

      return res.status(201).json(genre);
    } catch (error) {
      // Обработка ошибки уникальности
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ status: false, error: 'Genre with this name already exists' });
      }
      console.error('Create genre error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Обновить жанр
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { genreName, genreDescription } = req.body;

      const genre = await this.Genre.findByPk(id);
      if (!genre) {
        return res.status(404).json({ status: false, error: 'Genre not found' });
      }

      await genre.update({
        genreName: genreName || genre.genreName,
        genreDescription: genreDescription !== undefined ? genreDescription : genre.genreDescription,
      });

      return res.status(200).json(genre);
    } catch (error) {
      // Обработка ошибки уникальности
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ status: false, error: 'Genre with this name already exists' });
      }
      console.error('Update genre error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Удалить жанр
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const genre = await this.Genre.findByPk(id);
      if (!genre) {
        return res.status(404).json({ status: false, error: 'Genre not found' });
      }

      // Проверка, есть ли книги в этом жанре
      const booksCount = await this.Book.count({ where: { genreId: id } });
      if (booksCount > 0) {
        return res.status(409).json({
          status: false,
          error: `Cannot delete genre with ${booksCount} book(s). Delete books first.`,
        });
      }

      await genre.destroy();

      return res.status(200).json({ status: true });
    } catch (error) {
      console.error('Delete genre error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }
}

export default new GenreController();

