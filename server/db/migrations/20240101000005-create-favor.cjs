module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Books',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    await queryInterface.addIndex('Favors', ['userId', 'bookId'], {
      unique: true,
      name: 'favor_user_book_unique',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favors');
  },
};
