module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Authors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      authorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authorSurname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authorYears: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Authors');
  },
};
