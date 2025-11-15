module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    'Author',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      authorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authorSurname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authorYears: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Authors',
      timestamps: false,
    },
  );

  Author.associate = function (models) {
    Author.hasMany(models.Book, {
      foreignKey: 'authorId',
      as: 'books',
    });
  };

  return Author;
};
