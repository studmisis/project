import { Comment, User, Book } from '../db/models/index.js';

/**
 * Контроллер для работы с комментариями
 * Обрабатывает CRUD операции для комментариев
 */
class CommentController {
  constructor(dependencies = {}) {
    this.Comment = dependencies.Comment || Comment;
    this.User = dependencies.User || User;
    this.Book = dependencies.Book || Book;
  }

  /**
   * Получить все комментарии
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAll(req, res) {
    try {
      const { bookId } = req.query;

      const where = {};
      if (bookId) {
        where.bookId = bookId;
      }

      const comments = await this.Comment.findAll({
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
        order: [['id', 'DESC']],
      });

      return res.status(200).json(comments);
    } catch (error) {
      console.error('Get all comments error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Получить комментарий по ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getById(req, res) {
    try {
      const { id } = req.params;

      const comment = await this.Comment.findByPk(id, {
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

      if (!comment) {
        return res.status(404).json({ status: false, error: 'Comment not found' });
      }

      return res.status(200).json(comment);
    } catch (error) {
      console.error('Get comment by id error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Создать новый комментарий
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async create(req, res) {
    try {
      const { userId, bookId, commentText } = req.body;

      // Валидация обязательных полей
      if (!userId || !bookId || !commentText) {
        return res.status(400).json({ status: false, error: 'userId, bookId and commentText are required' });
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

      const comment = await this.Comment.create({
        userId,
        bookId,
        commentText,
      });

      const commentWithRelations = await this.Comment.findByPk(comment.id, {
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

      return res.status(201).json(commentWithRelations);
    } catch (error) {
      console.error('Create comment error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Обновить комментарий
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { commentText } = req.body;

      if (!commentText) {
        return res.status(400).json({ status: false, error: 'commentText is required' });
      }

      const comment = await this.Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ status: false, error: 'Comment not found' });
      }

      await comment.update({ commentText });

      const updatedComment = await this.Comment.findByPk(id, {
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

      return res.status(200).json(updatedComment);
    } catch (error) {
      console.error('Update comment error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }

  /**
   * Удалить комментарий
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const comment = await this.Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ status: false, error: 'Comment not found' });
      }

      await comment.destroy();

      return res.status(200).json({ status: true });
    } catch (error) {
      console.error('Delete comment error:', error);
      return res.status(500).json({ status: false, error: 'Internal server error' });
    }
  }
}

export default new CommentController();

