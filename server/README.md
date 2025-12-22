## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка `.env`

Создайте файл `.env` в папке `server/`:

```env
PORT=ваш_порт или по дефолту 3000
DB_USER=ваш_логин
DB_PASS=ваш_пароль
DB_NAME=название_БД
ACCESS_TOKEN_SECRET=ваш_секретный_ключ
REFRESH_TOKEN_SECRET=ваш_секретный_ключ
```

### 3. Запуск миграций

```bash
npm run db
```

### 4. Запуск сервера

```bash
npm start
```

## 📁 Структура проекта

```
server/
├── config/          # Конфигурация (JWT, cookies)
├── db/              # База данных
│   ├── models/      # Модели Sequelize
│   └── migrations/  # Миграции
├── middlewares/     # Middleware (проверка токенов)
├── routes/          # API маршруты
└── utils/           # Утилиты (генерация токенов)
```

## 🗄 База данных

### Таблицы:

- **Users** - пользователи
- **Authors** - авторы
- **Genres** - жанры
- **Books** - книги
- **Favors** - избранное
- **Ratings** - рейтинги
- **Comments** - комментарии

Все поля в **camelCase** (userName, userEmail, bookTitle и т.д.)

## 🔌 API Endpoints

### Аутентификация (`/api/auth`)

**POST `/api/auth/signup`** - Регистрация

Запрос:

```json
{
  "userName": "Иван",
  "userSurname": "Иванов",
  "userLogin": "ivan123",
  "userEmail": "ivan@example.com",
  "userPassword": "password123"
}
```

Ответ (200):

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "userName": "Иван",
    "userSurname": "Иванов",
    "userLogin": "ivan123",
    "userEmail": "ivan@example.com"
  }
}
```

Refresh token устанавливается в HTTP-only cookie `refreshToken`.

**POST `/api/auth/login`** - Вход

Запрос:

```json
{
  "userEmail": "ivan@example.com",
  "userPassword": "password123"
}
```

Ответ (200):

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "userName": "Иван",
    "userSurname": "Иванов",
    "userLogin": "ivan123",
    "userEmail": "ivan@example.com"
  }
}
```

**GET `/api/auth/logout`** - Выход

Ответ (200):

```json
{
  "status": true
}
```

**GET `/api/auth/check`** - Проверка токена (нужен refresh token в cookie)

Ответ (200):

```json
{
  "user": {
    "id": 1,
    "userName": "Иван",
    "userSurname": "Иванов",
    "userLogin": "ivan123",
    "userEmail": "ivan@example.com"
  },
  "accessToken": ""
}
```

### Токены (`/api/tokens`)

**GET `/api/tokens/refresh`** - Обновление токенов (нужен refresh token в cookie)

Ответ (200):

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "userName": "Иван",
    "userSurname": "Иванов",
    "userLogin": "ivan123",
    "userEmail": "ivan@example.com"
  }
}
```

### Книги (`/api/books`)

**GET `/api/books`** - Получить все книги

Ответ (200):

```json
[
  {
    "id": 1,
    "bookTitle": "Война и мир",
    "bookDescription": "Роман-эпопея",
    "bookDone": true,
    "bookImageUrl": "https://example.com/image.jpg",
    "authorId": 1,
    "genreId": 1,
    "author": {
      "id": 1,
      "authorName": "Лев",
      "authorSurname": "Толстой",
      "authorYears": "1828-1910"
    },
    "genre": {
      "id": 1,
      "genreName": "Классическая литература",
      "genreDescription": "Классические произведения"
    }
  }
]
```

**GET `/api/books/:id`** - Получить книгу по ID

Ответ (200): аналогично структуре выше (один объект)

**POST `/api/books`** - Создать книгу

Запрос:

```json
{
  "bookTitle": "Война и мир",
  "bookDescription": "Роман-эпопея",
  "bookDone": true,
  "bookImageUrl": "https://example.com/image.jpg",
  "authorId": 1,
  "genreId": 1
}
```

Обязательные поля: `bookTitle`, `authorId`, `genreId`

Ответ (201): созданная книга с автором и жанром

**PUT `/api/books/:id`** - Обновить книгу

Запрос (все поля опциональны):

```json
{
  "bookTitle": "Новое название",
  "bookDescription": "Новое описание",
  "bookDone": false,
  "bookImageUrl": "https://example.com/new-image.jpg",
  "authorId": 2,
  "genreId": 2
}
```

Ответ (200): обновленная книга с автором и жанром

**DELETE `/api/books/:id`** - Удалить книгу

Ответ (200):

```json
{
  "status": true
}
```

### Авторы (`/api/authors`)

**GET `/api/authors`** - Получить всех авторов

Ответ (200):

```json
[
  {
    "id": 1,
    "authorName": "Лев",
    "authorSurname": "Толстой",
    "authorYears": "1828-1910",
    "books": [
      {
        "id": 1,
        "bookTitle": "Война и мир",
        "bookImageUrl": "https://example.com/image.jpg"
      }
    ]
  }
]
```

**GET `/api/authors/:id`** - Получить автора по ID

Ответ (200): автор с полным списком книг (включая `bookDescription`, `bookDone`)

**POST `/api/authors`** - Создать автора

Запрос:

```json
{
  "authorName": "Лев",
  "authorSurname": "Толстой",
  "authorYears": "1828-1910"
}
```

Обязательные поля: `authorName`, `authorSurname`

Ответ (201): созданный автор

**PUT `/api/authors/:id`** - Обновить автора

Запрос (все поля опциональны):

```json
{
  "authorName": "Новое имя",
  "authorSurname": "Новая фамилия",
  "authorYears": "1828-1910"
}
```

Ответ (200): обновленный автор

**DELETE `/api/authors/:id`** - Удалить автора

Ответ (200):

```json
{
  "status": true
}
```

Ошибка (409): если у автора есть книги - `Cannot delete author with N book(s). Delete books first.`

### Жанры (`/api/genres`)

**GET `/api/genres`** - Получить все жанры

Ответ (200):

```json
[
  {
    "id": 1,
    "genreName": "Классическая литература",
    "genreDescription": "Классические произведения",
    "books": [
      {
        "id": 1,
        "bookTitle": "Война и мир",
        "bookImageUrl": "https://example.com/image.jpg"
      }
    ]
  }
]
```

**GET `/api/genres/:id`** - Получить жанр по ID

Ответ (200): жанр с полным списком книг (включая `bookDescription`, `bookDone`)

**POST `/api/genres`** - Создать жанр

Запрос:

```json
{
  "genreName": "Классическая литература",
  "genreDescription": "Классические произведения"
}
```

Обязательные поля: `genreName`

Ответ (201): созданный жанр

Ошибка (409): если жанр с таким именем уже существует

**PUT `/api/genres/:id`** - Обновить жанр

Запрос (все поля опциональны):

```json
{
  "genreName": "Новое название",
  "genreDescription": "Новое описание"
}
```

Ответ (200): обновленный жанр

**DELETE `/api/genres/:id`** - Удалить жанр

Ответ (200):

```json
{
  "status": true
}
```

Ошибка (409): если в жанре есть книги - `Cannot delete genre with N book(s). Delete books first.`

### Комментарии (`/api/comments`)

**GET `/api/comments`** - Получить все комментарии

Query параметры:

- `bookId` (опционально) - фильтр по книге

Пример: `GET /api/comments?bookId=1`

Ответ (200):

```json
[
  {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "commentText": "Отличная книга!",
    "user": {
      "id": 1,
      "userName": "Иван",
      "userSurname": "Иванов",
      "userLogin": "ivan123"
    },
    "book": {
      "id": 1,
      "bookTitle": "Война и мир"
    }
  }
]
```

Комментарии отсортированы по ID в порядке убывания (новые первыми).

**GET `/api/comments/:id`** - Получить комментарий по ID

Ответ (200): комментарий с пользователем и книгой

**POST `/api/comments`** - Создать комментарий

Запрос:

```json
{
  "userId": 1,
  "bookId": 1,
  "commentText": "Отличная книга!"
}
```

Обязательные поля: `userId`, `bookId`, `commentText`

Ответ (201): созданный комментарий с пользователем и книгой

**PUT `/api/comments/:id`** - Обновить комментарий

Запрос:

```json
{
  "commentText": "Обновленный текст комментария"
}
```

Обязательные поля: `commentText`

Ответ (200): обновленный комментарий с пользователем и книгой

**DELETE `/api/comments/:id`** - Удалить комментарий

Ответ (200):

```json
{
  "status": true
}
```

### Рейтинги (`/api/ratings`)

**GET `/api/ratings`** - Получить все рейтинги

Query параметры:

- `bookId` (опционально) - фильтр по книге
- `userId` (опционально) - фильтр по пользователю

Примеры:

- `GET /api/ratings?bookId=1` - все рейтинги книги
- `GET /api/ratings?userId=1` - все рейтинги пользователя
- `GET /api/ratings?bookId=1&userId=1` - рейтинг конкретного пользователя для книги

Ответ (200):

```json
[
  {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "rating": 5,
    "user": {
      "id": 1,
      "userName": "Иван",
      "userSurname": "Иванов",
      "userLogin": "ivan123"
    },
    "book": {
      "id": 1,
      "bookTitle": "Война и мир"
    }
  }
]
```

**GET `/api/ratings/:id`** - Получить рейтинг по ID

Ответ (200): рейтинг с пользователем и книгой

**GET `/api/ratings/book/:bookId/average`** - Получить средний рейтинг книги

Ответ (200):

```json
{
  "averageRating": 4.5,
  "count": 10
}
```

Если рейтингов нет:

```json
{
  "averageRating": 0,
  "count": 0
}
```

**POST `/api/ratings`** - Создать или обновить рейтинг

Запрос:

```json
{
  "userId": 1,
  "bookId": 1,
  "rating": 5
}
```

Обязательные поля: `userId`, `bookId`, `rating`

Валидация: `rating` должен быть от 1 до 5

Если рейтинг уже существует для этой пары пользователь-книга, он будет обновлен.

Ответ (201 при создании, 200 при обновлении): рейтинг с пользователем и книгой

**DELETE `/api/ratings/:id`** - Удалить рейтинг

Ответ (200):

```json
{
  "status": true
}
```

### Избранное (`/api/favors`)

**GET `/api/favors`** - Получить все избранное

Query параметры:

- `userId` (опционально) - фильтр по пользователю

Пример: `GET /api/favors?userId=1`

Ответ (200):

```json
[
  {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "user": {
      "id": 1,
      "userName": "Иван",
      "userSurname": "Иванов",
      "userLogin": "ivan123"
    },
    "book": {
      "id": 1,
      "bookTitle": "Война и мир",
      "bookDescription": "Роман-эпопея",
      "bookImageUrl": "https://example.com/image.jpg"
    }
  }
]
```

**GET `/api/favors/:id`** - Получить избранное по ID

Ответ (200): избранное с пользователем и книгой

**POST `/api/favors`** - Добавить в избранное

Запрос:

```json
{
  "userId": 1,
  "bookId": 1
}
```

Обязательные поля: `userId`, `bookId`

Ошибка (409): если книга уже в избранном - `Book already in favorites`

Ответ (201): созданное избранное с пользователем и книгой

**DELETE `/api/favors/:id`** - Удалить из избранного по ID

Ответ (200):

```json
{
  "status": true
}
```

**DELETE `/api/favors/user-book/remove`** - Удалить из избранного по пользователю и книге

Запрос:

```json
{
  "userId": 1,
  "bookId": 1
}
```

Обязательные поля: `userId`, `bookId`

Ответ (200):

```json
{
  "status": true
}
```

## 📊 Структура данных

### User (Пользователь)

```json
{
  "id": 1,
  "userName": "Иван",
  "userSurname": "Иванов",
  "userLogin": "ivan123",
  "userEmail": "ivan@example.com"
}
```

### Author (Автор)

```json
{
  "id": 1,
  "authorName": "Лев",
  "authorSurname": "Толстой",
  "authorYears": "1828-1910"
}
```

### Genre (Жанр)

```json
{
  "id": 1,
  "genreName": "Классическая литература",
  "genreDescription": "Классические произведения"
}
```

### Book (Книга)

```json
{
  "id": 1,
  "bookTitle": "Война и мир",
  "bookDescription": "Роман-эпопея",
  "bookDone": true,
  "bookImageUrl": "https://example.com/image.jpg",
  "authorId": 1,
  "genreId": 1
}
```

### Comment (Комментарий)

```json
{
  "id": 1,
  "userId": 1,
  "bookId": 1,
  "commentText": "Отличная книга!"
}
```

### Rating (Рейтинг)

```json
{
  "id": 1,
  "userId": 1,
  "bookId": 1,
  "rating": 5
}
```

Рейтинг от 1 до 5. Один пользователь может поставить только один рейтинг на книгу.

### Favor (Избранное)

```json
{
  "id": 1,
  "userId": 1,
  "bookId": 1
}
```

## 🔐 Аутентификация

- **Access Token** - короткоживущий (5 секунд), в заголовке `Authorization: Bearer <token>`
- **Refresh Token** - долгоживущий (12 часов), в cookie `refreshToken`

## ⚠️ Коды ошибок

- **200** - Успешный запрос
- **201** - Ресурс успешно создан
- **400** - Неверный запрос (отсутствуют обязательные поля, неверный формат данных)
- **401** - Не авторизован (неверный пароль, отсутствует токен)
- **403** - Доступ запрещен (пользователь уже существует)
- **404** - Ресурс не найден
- **409** - Конфликт (дубликат, нельзя удалить из-за связей)
- **500** - Внутренняя ошибка сервера

### Примеры ошибок

```json
{
  "status": false,
  "error": "Title, authorId and genreId are required"
}
```

```json
{
  "status": false,
  "error": "User not found"
}
```

```json
{
  "status": false,
  "error": "Cannot delete author with 5 book(s). Delete books first."
}
```

## 📝 Команды

- `npm start` - запуск сервера
- `npm run db` - пересборка БД (удаление → создание → миграции → сидеры)

## ⚙️ Технологии

- Node.js + Express
- PostgreSQL + Sequelize
- JWT для аутентификации
- bcrypt для паролей
