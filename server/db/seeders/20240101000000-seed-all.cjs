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

    // Авторы: 1-Толстой, 2-Достоевский, 3-Пушкин, 4-Чехов, 5-Тургенев, 6-Гоголь, 7-Лермонтов, 8-Булгаков, 9-Набоков, 10-Пастернак
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
        {
          authorName: 'Николай',
          authorSurname: 'Гоголь',
          authorYears: '1809-1852',
        },
        {
          authorName: 'Михаил',
          authorSurname: 'Лермонтов',
          authorYears: '1814-1841',
        },
        {
          authorName: 'Михаил',
          authorSurname: 'Булгаков',
          authorYears: '1891-1940',
        },
        {
          authorName: 'Владимир',
          authorSurname: 'Набоков',
          authorYears: '1899-1977',
        },
        {
          authorName: 'Борис',
          authorSurname: 'Пастернак',
          authorYears: '1890-1960',
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

    // Книги: расширенный список
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
        {
          bookTitle: 'Мёртвые души',
          bookDescription: 'Поэма о похождениях Чичикова',
          bookDone: true,
          bookImageUrl: null,
          authorId: 6, // Гоголь
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Ревизор',
          bookDescription: 'Комедия о мнимом ревизоре',
          bookDone: true,
          bookImageUrl: null,
          authorId: 6, // Гоголь
          genreId: 5, // Драма
        },
        {
          bookTitle: 'Шинель',
          bookDescription: 'Повесть о маленьком человеке',
          bookDone: true,
          bookImageUrl: null,
          authorId: 6, // Гоголь
          genreId: 2, // Повесть
        },
        {
          bookTitle: 'Герой нашего времени',
          bookDescription: 'Роман о Печорине, лишнем человеке',
          bookDone: true,
          bookImageUrl: null,
          authorId: 7, // Лермонтов
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Мастер и Маргарита',
          bookDescription: 'Философский роман о добре и зле',
          bookDone: true,
          bookImageUrl: null,
          authorId: 8, // Булгаков
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Собачье сердце',
          bookDescription: 'Повесть о профессоре Преображенском',
          bookDone: true,
          bookImageUrl: null,
          authorId: 8, // Булгаков
          genreId: 2, // Повесть
        },
        {
          bookTitle: 'Белая гвардия',
          bookDescription: 'Роман о семье Турбиных в годы Гражданской войны',
          bookDone: true,
          bookImageUrl: null,
          authorId: 8, // Булгаков
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Лолита',
          bookDescription: 'Роман о трагической страсти',
          bookDone: true,
          bookImageUrl: null,
          authorId: 9, // Набоков
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Защита Лужина',
          bookDescription: 'Роман о гениальном шахматисте',
          bookDone: true,
          bookImageUrl: null,
          authorId: 9, // Набоков
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Доктор Живаго',
          bookDescription: 'Роман о судьбе интеллигенции в революции',
          bookDone: true,
          bookImageUrl: null,
          authorId: 10, // Пастернак
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Воскресение',
          bookDescription: 'Роман о нравственном возрождении',
          bookDone: true,
          bookImageUrl: null,
          authorId: 1, // Толстой
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Бесы',
          bookDescription: 'Роман о революционном движении',
          bookDone: true,
          bookImageUrl: null,
          authorId: 2, // Достоевский
          genreId: 1, // Роман
        },
        {
          bookTitle: 'Дубровский',
          bookDescription: 'Роман о благородном разбойнике',
          bookDone: true,
          bookImageUrl: null,
          authorId: 3, // Пушкин
          genreId: 2, // Повесть
        },
        {
          bookTitle: 'Палата №6',
          bookDescription: 'Повесть о сумасшедшем доме',
          bookDone: true,
          bookImageUrl: null,
          authorId: 4, // Чехов
          genreId: 2, // Повесть
        },
        {
          bookTitle: 'Рудин',
          bookDescription: 'Роман о лишнем человеке',
          bookDone: true,
          bookImageUrl: null,
          authorId: 5, // Тургенев
          genreId: 1, // Роман
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
          userId: 1, // Иван
          bookId: 11, // Мёртвые души
        },
        {
          userId: 1, // Иван
          bookId: 15, // Мастер и Маргарита
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
          userId: 2, // Мария
          bookId: 14, // Герой нашего времени
        },
        {
          userId: 2, // Мария
          bookId: 20, // Доктор Живаго
        },
        {
          userId: 3, // Алексей
          bookId: 5, // Идиот
        },
        {
          userId: 3, // Алексей
          bookId: 9, // Братья Карамазовы
        },
        {
          userId: 3, // Алексей
          bookId: 15, // Мастер и Маргарита
        },
        {
          userId: 3, // Алексей
          bookId: 18, // Лолита
        },
        {
          userId: 1, // Иван
          bookId: 21, // Воскресение
        },
        {
          userId: 2, // Мария
          bookId: 22, // Бесы
        },
        {
          userId: 3, // Алексей
          bookId: 13, // Шинель
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
          userId: 1, // Иван
          bookId: 11, // Мёртвые души
          rating: 5,
        },
        {
          userId: 1, // Иван
          bookId: 15, // Мастер и Маргарита
          rating: 5,
        },
        {
          userId: 1, // Иван
          bookId: 21, // Воскресение
          rating: 4,
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
          userId: 2, // Мария
          bookId: 14, // Герой нашего времени
          rating: 5,
        },
        {
          userId: 2, // Мария
          bookId: 20, // Доктор Живаго
          rating: 5,
        },
        {
          userId: 2, // Мария
          bookId: 22, // Бесы
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
          userId: 3, // Алексей
          bookId: 9, // Братья Карамазовы
          rating: 5,
        },
        {
          userId: 3, // Алексей
          bookId: 13, // Шинель
          rating: 4,
        },
        {
          userId: 3, // Алексей
          bookId: 15, // Мастер и Маргарита
          rating: 5,
        },
        {
          userId: 3, // Алексей
          bookId: 18, // Лолита
          rating: 4,
        },
        {
          userId: 1, // Иван
          bookId: 7, // Отцы и дети
          rating: 4,
        },
        {
          userId: 1, // Иван
          bookId: 12, // Ревизор
          rating: 5,
        },
        {
          userId: 2, // Мария
          bookId: 8, // Капитанская дочка
          rating: 5,
        },
        {
          userId: 2, // Мария
          bookId: 16, // Собачье сердце
          rating: 5,
        },
        {
          userId: 3, // Алексей
          bookId: 17, // Белая гвардия
          rating: 4,
        },
        {
          userId: 1, // Иван
          bookId: 19, // Защита Лужина
          rating: 4,
        },
        {
          userId: 2, // Мария
          bookId: 23, // Дубровский
          rating: 5,
        },
        {
          userId: 3, // Алексей
          bookId: 24, // Палата №6
          rating: 4,
        },
        {
          userId: 1, // Иван
          bookId: 25, // Рудин
          rating: 3,
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
          userId: 1, // Иван
          bookId: 1, // Война и мир
          commentText: 'Перечитываю уже третий раз. Каждый раз открываю что-то новое.',
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
        {
          userId: 1, // Иван
          bookId: 11, // Мёртвые души
          commentText: 'Гоголь - непревзойдённый мастер сатиры. Читается на одном дыхании.',
        },
        {
          userId: 2, // Мария
          bookId: 12, // Ревизор
          commentText: 'Остроумная комедия. Актуальна и сегодня.',
        },
        {
          userId: 3, // Алексей
          bookId: 13, // Шинель
          commentText: 'Трогательная история о маленьком человеке. Гоголь в лучшей форме.',
        },
        {
          userId: 1, // Иван
          bookId: 14, // Герой нашего времени
          commentText: 'Лермонтов создал незабываемый образ Печорина. Великолепная проза.',
        },
        {
          userId: 2, // Мария
          bookId: 15, // Мастер и Маргарита
          commentText: 'Фантастический роман о добре и зле. Булгаков - гений!',
        },
        {
          userId: 3, // Алексей
          bookId: 15, // Мастер и Маргарита
          commentText: 'Перечитываю каждый год. Каждый раз нахожу новые смыслы.',
        },
        {
          userId: 1, // Иван
          bookId: 16, // Собачье сердце
          commentText: 'Острая сатира на советскую действительность. Блестяще!',
        },
        {
          userId: 2, // Мария
          bookId: 17, // Белая гвардия
          commentText: 'Трогательная история о семье в годы Гражданской войны.',
        },
        {
          userId: 3, // Алексей
          bookId: 18, // Лолита
          commentText: 'Сложное произведение. Набоков - мастер слова.',
        },
        {
          userId: 1, // Иван
          bookId: 19, // Защита Лужина
          commentText: 'Интересный роман о шахматисте. Набоков показывает внутренний мир героя.',
        },
        {
          userId: 2, // Мария
          bookId: 20, // Доктор Живаго
          commentText: 'Эпический роман о судьбе человека в эпоху перемен.',
        },
        {
          userId: 3, // Алексей
          bookId: 21, // Воскресение
          commentText: 'Толстой о нравственном возрождении. Глубокое произведение.',
        },
        {
          userId: 1, // Иван
          bookId: 22, // Бесы
          commentText: 'Достоевский предвидел будущее. Актуально и сегодня.',
        },
        {
          userId: 2, // Мария
          bookId: 23, // Дубровский
          commentText: 'Увлекательный роман о благородном разбойнике. Пушкин в лучшей форме.',
        },
        {
          userId: 3, // Алексей
          bookId: 24, // Палата №6
          commentText: 'Чехов о безумии общества. Потрясающая повесть.',
        },
        {
          userId: 1, // Иван
          bookId: 25, // Рудин
          commentText: 'Тургенев о лишнем человеке. Классика русской литературы.',
        },
        {
          userId: 2, // Мария
          bookId: 9, // Братья Карамазовы
          commentText: 'Философский роман о вере и сомнении. Достоевский на пике формы.',
        },
        {
          userId: 3, // Алексей
          bookId: 7, // Отцы и дети
          commentText: 'Актуальная тема конфликта поколений. Тургенев - мастер диалога.',
        },
        {
          userId: 1, // Иван
          bookId: 8, // Капитанская дочка
          commentText:
            'Исторический роман о пугачёвском восстании. Пушкин - мастер исторической прозы.',
        },
        {
          userId: 2, // Мария
          bookId: 10, // Дама с собачкой
          commentText: 'Тонкий рассказ о любви. Чехов - мастер короткой прозы.',
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
