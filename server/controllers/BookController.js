import { Book, Author, Genre } from '../db/models/index.js';

/**
 * Контроллер для работы с книгами
 * Обрабатывает CRUD операции для книг
 */
class BookController {
  constructor(dependencies = {}) {
    this.Book = dependencies.Book || Book;
    this.Author = dependencies.Author || Author;
    this.Genre = dependencies.Genre || Genre;
  }

  /**
   * Получить все книги с авторами и жанрами
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAll(req, res) {
    try {
      const books = await this.Book.findAll({
        include: [
          {
            model: this.Author,
            as: 'author',
            attributes: ['id', 'authorName', 'authorSurname', 'authorYears'],
          },
          {
            model: this.Genre,
            as: 'genre',
            attributes: ['id', 'genreName', 'genreDescription'],
          },
        ],
      });

      return res.status(200).json(books);
    } catch (error) {
      console.error('Get all books error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Получить книгу по ID с автором и жанром
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getById(req, res) {
    try {
      const { id } = req.params;

      const book = await this.Book.findByPk(id, {
        include: [
          {
            model: this.Author,
            as: 'author',
            attributes: ['id', 'authorName', 'authorSurname', 'authorYears'],
          },
          {
            model: this.Genre,
            as: 'genre',
            attributes: ['id', 'genreName', 'genreDescription'],
          },
        ],
      });

      if (!book) {
        return res.status(404).json({ status: false, error: 'Book not found' });
      }

      return res.status(200).json(book);
    } catch (error) {
      console.error('Get book by id error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Создать новую книгу
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async create(req, res) {
    try {
      const { bookTitle, bookDescription, bookDone, bookImageUrl, authorId, genreId } = req.body;

      // Валидация обязательных полей
      if (!bookTitle || !authorId || !genreId) {
        return res.status(400).json({ status: false, error: 'Title, authorId and genreId are required' });
      }

      // Проверка существования автора и жанра
      const author = await this.Author.findByPk(authorId);
      if (!author) {
        return res.status(404).json({ status: false, error: 'Author not found' });
      }

      const genre = await this.Genre.findByPk(genreId);
      if (!genre) {
        return res.status(404).json({ status: false, error: 'Genre not found' });
      }

      const book = await this.Book.create({
        bookTitle,
        bookDescription: bookDescription || null,
        bookDone: bookDone || false,
        bookImageUrl: bookImageUrl || null,
        authorId,
        genreId,
      });

      const bookWithRelations = await this.Book.findByPk(book.id, {
        include: [
          {
            model: this.Author,
            as: 'author',
            attributes: ['id', 'authorName', 'authorSurname', 'authorYears'],
          },
          {
            model: this.Genre,
            as: 'genre',
            attributes: ['id', 'genreName', 'genreDescription'],
          },
        ],
      });

      return res.status(201).json(bookWithRelations);
    } catch (error) {
      console.error('Create book error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Обновить книгу
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { bookTitle, bookDescription, bookDone, bookImageUrl, authorId, genreId } = req.body;

      const book = await this.Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ status: false, error: 'Book not found' });
      }

      // Проверка существования автора и жанра, если они указаны
      if (authorId) {
        const author = await this.Author.findByPk(authorId);
        if (!author) {
          return res.status(404).json({ status: false, error: 'Author not found' });
        }
      }

      if (genreId) {
        const genre = await this.Genre.findByPk(genreId);
        if (!genre) {
          return res.status(404).json({ status: false, error: 'Genre not found' });
        }
      }

      await book.update({
        bookTitle: bookTitle || book.bookTitle,
        bookDescription: bookDescription !== undefined ? bookDescription : book.bookDescription,
        bookDone: bookDone !== undefined ? bookDone : book.bookDone,
        bookImageUrl: bookImageUrl !== undefined ? bookImageUrl : book.bookImageUrl,
        authorId: authorId || book.authorId,
        genreId: genreId || book.genreId,
      });

      const updatedBook = await this.Book.findByPk(id, {
        include: [
          {
            model: this.Author,
            as: 'author',
            attributes: ['id', 'authorName', 'authorSurname', 'authorYears'],
          },
          {
            model: this.Genre,
            as: 'genre',
            attributes: ['id', 'genreName', 'genreDescription'],
          },
        ],
      });

      return res.status(200).json(updatedBook);
    } catch (error) {
      console.error('Update book error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Удалить книгу
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const book = await this.Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ status: false, error: 'Book not found' });
      }

      await book.destroy();

      return res.status(200).json({ status: true });
    } catch (error) {
      console.error('Delete book error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }
}

export default new BookController();

