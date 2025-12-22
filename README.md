# 📚 Литера - Библиотека книг

Веб-приложение для управления личной библиотекой книг с возможностью добавления комментариев, рейтингов и избранного.

## 🚀 Быстрый старт

### Предварительные требования

- Docker и Docker Compose
- Файл `.env` в корне проекта

### 1. Создайте файл `.env`

Создайте файл `.env` в корне проекта со следующим содержимым:

```env
PORT=3000
DB_USER=postgres
DB_PASS=postgres
DB_NAME=litera_db
DB_HOST=db
DB_PORT=5432
ACCESS_TOKEN_SECRET=ваш_секретный_ключ_для_access_token
REFRESH_TOKEN_SECRET=ваш_секретный_ключ_для_refresh_token
```

### 2. Запуск проекта

Из корневой папки проекта выполните:

```bash
docker compose up --build
```

Для запуска в фоновом режиме:

```bash
docker compose up -d --build
```

### 3. Проверка работы

После запуска будут доступны:

- **Frontend:** http://localhost:80
- **Backend API:** http://localhost:3000
- **PostgreSQL:** `localhost:5432` (внутри Docker сети)

## 📁 Структура проекта

```
project/
├── server/          # Backend (Node.js + Express)
│   ├── controllers/    # Контроллеры
│   ├── routes/         # API маршруты
│   ├── db/             # Модели, миграции, сидеры
│   ├── middlewares/     # Middleware
│   └── config/         # Конфигурация
├── web/            # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/  # React компоненты
│   │   ├── pages/       # Страницы
│   │   └── services/   # API сервисы
│   └── Dockerfile
├── docker-compose.yml   # Конфигурация Docker Compose
└── .env                 # Переменные окружения
```

## 🐳 Docker сервисы

Проект состоит из 3 сервисов:

1. **`db`** - PostgreSQL база данных

   - Образ: `postgres:16`
   - Данные сохраняются в volume `pgdata`

2. **`server`** - Node.js Backend

   - Автоматически выполняет миграции и сидеры при запуске
   - Порт: `3000` (настраивается через `PORT` в `.env`)

3. **`frontend`** - React Frontend (Nginx)
   - Статические файлы раздаются через Nginx
   - Порт: `8080`

## 📝 Полезные команды

### Управление контейнерами

```bash
# Запуск проекта
docker compose up --build

# Запуск в фоновом режиме
docker compose up -d --build

# Остановка контейнеров
docker compose down

# Остановка с удалением volumes (удалит БД!)
docker compose down -v

# Перезапуск сервисов
docker compose restart

# Просмотр статуса
docker compose ps

# Просмотр логов
docker compose logs

# Логи конкретного сервиса
docker compose logs server
docker compose logs frontend
docker compose logs db

# Следить за логами в реальном времени
docker compose logs -f server
```

### Проверка работы API

```bash
# Получить все книги
curl http://localhost:3000/api/books

# Получить всех авторов
curl http://localhost:3000/api/authors

# Получить все жанры
curl http://localhost:3000/api/genres
```

## ⚠️ Решение проблем

### Ошибка: `failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 2`

**Причина:** Ошибки компиляции в коде фронтенда.

**Решение:**

1. Перейдите в папку `web`:
   ```bash
   cd web
   ```
2. Запустите сборку вручную:
   ```bash
   npm install
   npm run build
   ```
3. Исправьте все ошибки, которые появятся
4. Вернитесь в корень проекта и запустите снова:
   ```bash
   cd ..
   docker compose up --build
   ```

### Ошибка: `failed to solve: process "/bin/sh -c npm install" did not complete successfully: exit code: 254`

**Причина:** Отсутствует папка `web` или проблемы с зависимостями.

**Решение:**

**Вариант 1:** Убедитесь, что папка `web/` существует и содержит `package.json`

**Вариант 2:** Если фронтенд не нужен, закомментируйте секцию `frontend` в `docker-compose.yml`:

```yaml
# frontend:
#   build: ./web
#   container_name: frontend
#   restart: always
#   ports:
#     - "8080:80"
```

Тогда запустится только сервер и база данных.

### Ошибка: `Ports are not available: bind: address already in use`

**Причина:** Порт 3000 или 8080 уже занят другим процессом.

**Решение:**

1. Измените порты в `.env` и `docker-compose.yml`
2. Или остановите процесс, занимающий порт:

   ```bash
   # Найти процесс на порту 3000
   lsof -i :3000

   # Остановить процесс (замените PID)
   kill -9 <PID>
   ```

### Сервер не может подключиться к БД

**Причина:** Неправильный `DB_HOST` в `.env`.

**Решение:**

- Для Docker: `DB_HOST=db` (имя сервиса из docker-compose.yml)
- Для локального запуска: `DB_HOST=127.0.0.1` или `localhost`

## 📚 Дополнительная документация

- [Документация Backend API](./server/README.md) - полное описание всех эндпоинтов
- [Документация Frontend](./web/README.md) - информация о фронтенде

## ⚙️ Технологии

### Backend

- Node.js + Express
- PostgreSQL + Sequelize ORM
- JWT аутентификация
- bcrypt для паролей

### Frontend

- React 19 + TypeScript
- Vite
- React Router DOM
- SCSS модули

### Инфраструктура

- Docker & Docker Compose
- Nginx (для фронтенда)
- PostgreSQL 16

## 📄 Лицензия

ISC
