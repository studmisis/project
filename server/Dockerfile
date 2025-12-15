
# Загрузка легкой ноды
FROM node:20-slim

# Установка рабочего каталога
WORKDIR /app

# Установка нужных для запуска пакетов
RUN apt-get update && \
    apt-get install -y postgresql-client netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Копирование манифеста и установка зависимостей
COPY package*.json ./
RUN npm install

# Копия всего кода из проекта
COPY . .

# Перенос скрипта запуска и выдача прав на исполнение
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Порт контейнера и запуск скрипта
EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
