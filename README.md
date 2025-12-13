# project
Для запуска сервера и прод версии проекта нужно из корневой папки /project запустить:
1) docker compose up --build (можно без build, но не будет пересборки (просто запустятся контейнеры без новых изменений))

# Ошибки
Может всплыть:
1) failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 2

Возникает если есть ошибки в коде на этом этапе может ошибка вылететь. Попробуйте ручками запустить npm run build и исправить все ошибки, которые покажутся. Потом снова запустить

2) failed to solve: process "/bin/sh -c npm install" did not complete successfully: exit code: 254

Нет фронта :) Нужно его догрузить или вырезать/закомментировать строчки из docker-compose.yml 
```
  frontend:
    build: ./web
    container_name: frontend
    restart: always
    ports:
      - "80:80" 
```
Тогда запустится только сервер