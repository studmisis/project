module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Books',
          key: 'id',
        },
      },
      commentText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'Comments',
      timestamps: false,
    },
  );

  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Comment.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'book',
    });
  };

  return Comment;
};
