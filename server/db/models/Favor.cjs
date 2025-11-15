module.exports = (sequelize, DataTypes) => {
  const Favor = sequelize.define(
    'Favor',
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
    },
    {
      tableName: 'Favors',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['userId', 'bookId'],
        },
      ],
    },
  );

  Favor.associate = function (models) {
    Favor.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Favor.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'book',
    });
  };

  return Favor;
};
