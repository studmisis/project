module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    'Genre',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      genreName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      genreDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'Genres',
      timestamps: false,
    },
  );

  Genre.associate = function (models) {
    Genre.hasMany(models.Book, {
      foreignKey: 'genreId',
      as: 'books',
    });
  };

  return Genre;
};
