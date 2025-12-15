# Загрузка легкой ноды
FROM node:20-slim AS build

# Установка рабочего каталога
WORKDIR /app

# Копирование манифеста и установка зависимостей
COPY package*.json ./
RUN npm install

# Копия всего кода из проекта и билд фронта 
COPY . .
RUN npm run build

# Загрузка nginx чтобы раздать фронт
FROM nginx:alpine
# Перенос статических файлов (npm run build)
COPY --from=build /app/dist /usr/share/nginx/html

# Порт
EXPOSE 80
