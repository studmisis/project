'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = '111';

    // Пользователи: 1-Иван, 2-Мария, 3-Алексей
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          userName: 'Иван',
          userSurname: 'Иванов',
          userLogin: 'ivan',
          userEmail: 'ivan@ivan.com',
          userPassword: await bcrypt.hash(password, 10),
        },
        {
          userName: 'Мария',
          userSurname: 'Петрова',
          userLogin: 'maria',
          userEmail: 'maria@maria.com',
          userPassword: await bcrypt.hash(password, 10),
        },
        {
          userName: 'Алексей',
          userSurname: 'Сидоров',
          userLogin: 'alex',
          userEmail: 'alex@alex.com',
          userPassword: await bcrypt.hash(password, 10),
        },
      ],
      {},
    );

    // Авторы: 1-Толстой, 2-Достоевский, 3-Пушкин, 4-Чехов, 5-Тургенев
    await queryInterface.bulkInsert(
      'Authors',
      [
        {
          authorName: 'Лев',
          authorSurname: 'Толстой',
          authorYears: '1828-1910',
        },
        {
          authorName: 'Фёдор',
          authorSurname: 'Достоевский',
          authorYears: '1821-1881',
        },
        {
          authorName: 'Александр',
          authorSurname: 'Пушкин',
          authorYears: '1799-1837',
        },
        {
          authorName: 'Антон',
          authorSurname: 'Чехов',
          authorYears: '1860-1904',
        },
        {
          authorName: 'Иван',
          authorSurname: 'Тургенев',
          authorYears: '1818-1883',
        },
      ],
      {},
    );

    // Жанры: 1-Роман, 2-Повесть, 3-Рассказ, 4-Поэзия, 5-Драма, 6-Детектив
    await queryInterface.bulkInsert(
      'Genres',
      [
        {
          genreName: 'Роман',
          genreDescription: 'Большое повествовательное произведение',
        },
        {
          genreName: 'Повесть',
          genreDescription: 'Средний по объёму эпический жанр',
        },
        {
          genreName: 'Рассказ',
          genreDescription: 'Небольшое прозаическое произведение',
        },
        {
          genreName: 'Поэзия',
          genreDescription: 'Стихотворные произведения',
        },
        {
          genreName: 'Драма',
          genreDescription: 'Драматические произведения для театра',
        },
        {
          genreName: 'Детектив',
          genreDescription: 'Произведения о расследовании преступлений',
        },
      ],
      {},
    );

    // Книги: 1-Война и мир, 2-Преступление и наказание, 3-Евгений Онегин, 4-Анна Каренина, 5-Идиот, 6-Вишнёвый сад, 7-Отцы и дети, 8-Капитанская дочка, 9-Братья Карамазовы, 10-Дама с собачкой
    await queryInterface.bulkInsert(
      'Books',
      [
        {
          bookTitle: 'Война и мир',
          bookDescription: 'Эпический роман о войне 1812 года и жизни русского общества',
          bookDone: true,
          bookImageUrl: null,
          authorId: 1, // Толстой
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Преступление и наказание',
          bookDescription: 'Психологический роман о студенте Раскольникове',
          bookDone: true,
          bookImageUrl: null,
          authorId: 2, // Достоевский
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Евгений Онегин',
          bookDescription: 'Роман в стихах о жизни светского общества',
          bookDone: true,
          bookImageUrl: null,
          authorId: 3, // Пушкин
          genreId: 4, // Поэзия
        },
        {
          bookTitle: 'Анна Каренина',
          bookDescription: 'Роман о трагической любви замужней дамы',
          bookDone: true,
          bookImageUrl: null,
          authorId: 1, // Толстой
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Идиот',
          bookDescription: 'Роман о князе Мышкине, олицетворении добра',
          bookDone: true,
          bookImageUrl: null,
          authorId: 2, // Достоевский
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Вишнёвый сад',
          bookDescription: 'Пьеса о продаже родового имения',
          bookDone: true,
          bookImageUrl: null,
          authorId: 4, // Чехов
          genreId: 5, // Драма
        },
        {
          bookTitle: 'Отцы и дети',
          bookDescription: 'Роман о конфликте поколений',
          bookDone: true,
          bookImageUrl: null,
          authorId: 5, // Тургенев
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Капитанская дочка',
          bookDescription: 'Исторический роман о пугачёвском восстании',
          bookDone: true,
          bookImageUrl: null,
          authorId: 3, // Пушкин
          genreId: 2, // Повесть
        },
        {
          bookTitle: 'Братья Карамазовы',
          bookDescription: 'Философский роман о трёх братьях',
          bookDone: true,
          bookImageUrl: null,
          authorId: 2, // Достоевский
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Дама с собачкой',
          bookDescription: 'Рассказ о запретной любви',
          bookDone: true,
          bookImageUrl: null,
          authorId: 4, // Чехов
          genreId: 3, // Рассказ
        },
      ],
      {},
    );

    // Избранное
    await queryInterface.bulkInsert(
      'Favors',
      [
        {
          userId: 1, // Иван
          bookId: 1, // Война и мир
        },
        {
          userId: 1, // Иван
          bookId: 2, // Преступление и наказание
        },
        {
          userId: 2, // Мария
          bookId: 3, // Евгений Онегин
        },
        {
          userId: 2, // Мария
          bookId: 4, // Анна Каренина
        },
        {
          userId: 3, // Алексей
          bookId: 5, // Идиот
        },
      ],
      {},
    );

    // Рейтинги
    await queryInterface.bulkInsert(
      'Ratings',
      [
        {
          userId: 1, // Иван
          bookId: 1, // Война и мир
          rating: 5,
        },
        {
          userId: 1, // Иван
          bookId: 2, // Преступление и наказание
          rating: 5,
        },
        {
          userId: 2, // Мария
          bookId: 3, // Евгений Онегин
          rating: 5,
        },
        {
          userId: 2, // Мария
          bookId: 4, // Анна Каренина
          rating: 4,
        },
        {
          userId: 3, // Алексей
          bookId: 5, // Идиот
          rating: 5,
        },
        {
          userId: 3, // Алексей
          bookId: 6, // Вишнёвый сад
          rating: 4,
        },
        {
          userId: 1, // Иван
          bookId: 7, // Отцы и дети
          rating: 4,
        },
        {
          userId: 2, // Мария
          bookId: 8, // Капитанская дочка
          rating: 5,
        },
      ],
      {},
    );

    // Комментарии
    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          userId: 1, // Иван
          bookId: 1, // Война и мир
          commentText: 'Великолепное произведение! Один из лучших романов русской литературы.',
        },
        {
          userId: 2, // Мария
          bookId: 3, // Евгений Онегин
          commentText: 'Любимая книга с детства. Пушкин - гений!',
        },
        {
          userId: 3, // Алексей
          bookId: 5, // Идиот
          commentText:
            'Глубокий психологический роман. Достоевский мастерски раскрывает характеры персонажей.',
        },
        {
          userId: 1, // Иван
          bookId: 2, // Преступление и наказание
          commentText: 'Заставляет задуматься о морали и нравственности. Сильное впечатление.',
        },
        {
          userId: 2, // Мария
          bookId: 4, // Анна Каренина
          commentText: 'Трагичная история любви. Толстой создал незабываемых персонажей.',
        },
        {
          userId: 3, // Алексей
          bookId: 6, // Вишнёвый сад
          commentText: 'Классика русской драматургии. Чехов - мастер подтекста.',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Ratings', null, {});
    await queryInterface.bulkDelete('Favors', null, {});
    await queryInterface.bulkDelete('Books', null, {});
    await queryInterface.bulkDelete('Genres', null, {});
    await queryInterface.bulkDelete('Authors', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
