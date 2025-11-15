module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userSurname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userLogin: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Users',
      timestamps: false,
    },
  );

  User.associate = function (models) {
    User.hasMany(models.Favor, {
      foreignKey: 'userId',
      as: 'favors',
    });
    User.hasMany(models.Rating, {
      foreignKey: 'userId',
      as: 'ratings',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
    });
  };

  return User;
};
