import { Author, Book } from '../db/models/index.js';

/**
 * Контроллер для работы с авторами
 * Обрабатывает CRUD операции для авторов
 */
class AuthorController {
  constructor(dependencies = {}) {
    this.Author = dependencies.Author || Author;
    this.Book = dependencies.Book || Book;
  }

  /**
   * Получить всех авторов
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAll(req, res) {
    try {
      const authors = await this.Author.findAll({
        include: [
          {
            model: this.Book,
            as: 'books',
            attributes: ['id', 'bookTitle', 'bookImageUrl'],
          },
        ],
      });

      return res.status(200).json(authors);
    } catch (error) {
      console.error('Get all authors error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Получить автора по ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getById(req, res) {
    try {
      const { id } = req.params;

      const author = await this.Author.findByPk(id, {
        include: [
          {
            model: this.Book,
            as: 'books',
            attributes: ['id', 'bookTitle', 'bookDescription', 'bookImageUrl', 'bookDone'],
          },
        ],
      });

      if (!author) {
        return res.status(404).json({ status: false, error: 'Author not found' });
      }

      return res.status(200).json(author);
    } catch (error) {
      console.error('Get author by id error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Создать нового автора
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async create(req, res) {
    try {
      const { authorName, authorSurname, authorYears } = req.body;

      // Валидация обязательных полей
      if (!authorName || !authorSurname) {
        return res
          .status(400)
          .json({ status: false, error: 'authorName and authorSurname are required' });
      }

      const author = await this.Author.create({
        authorName,
        authorSurname,
        authorYears: authorYears || null,
      });

      return res.status(201).json(author);
    } catch (error) {
      console.error('Create author error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Обновить автора
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { authorName, authorSurname, authorYears } = req.body;

      const author = await this.Author.findByPk(id);
      if (!author) {
        return res.status(404).json({ status: false, error: 'Author not found' });
      }

      await author.update({
        authorName: authorName || author.authorName,
        authorSurname: authorSurname || author.authorSurname,
        authorYears: authorYears !== undefined ? authorYears : author.authorYears,
      });

      return res.status(200).json(author);
    } catch (error) {
      console.error('Update author error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Удалить автора
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const author = await this.Author.findByPk(id);
      if (!author) {
        return res.status(404).json({ status: false, error: 'Author not found' });
      }

      // Проверка, есть ли книги у автора
      const booksCount = await this.Book.count({ where: { authorId: id } });
      if (booksCount > 0) {
        return res.status(409).json({
          status: false,
          error: `Cannot delete author with ${booksCount} book(s). Delete books first.`,
        });
      }

      await author.destroy();

      return res.status(200).json({ status: true });
    } catch (error) {
      console.error('Delete author error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }
}

export default new AuthorController();
