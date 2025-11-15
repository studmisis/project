module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bookTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bookDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      bookImageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Authors',
          key: 'id',
        },
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Genres',
          key: 'id',
        },
      },
    },
    {
      tableName: 'Books',
      timestamps: false,
    },
  );

  Book.associate = function (models) {
    Book.belongsTo(models.Author, {
      foreignKey: 'authorId',
      as: 'author',
    });
    Book.belongsTo(models.Genre, {
      foreignKey: 'genreId',
      as: 'genre',
    });
    Book.hasMany(models.Favor, {
      foreignKey: 'bookId',
      as: 'favors',
    });
    Book.hasMany(models.Rating, {
      foreignKey: 'bookId',
      as: 'ratings',
    });
    Book.hasMany(models.Comment, {
      foreignKey: 'bookId',
      as: 'comments',
    });
  };

  return Book;
};
