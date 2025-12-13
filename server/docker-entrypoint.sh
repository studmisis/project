#!/bin/sh

echo "Ожидание PostgreSQL"
until pg_isready -h "$DB_HOST" -p "$DB_PORT"; do
  sleep 1
done

echo "PostgreSQL поднялся"

echo "Запуск миграций"
npx sequelize-cli db:migrate

echo "Запуск сидеров для заполнения базы"
npx sequelize-cli db:seed:all

echo "Запуск сервера"
npm start
