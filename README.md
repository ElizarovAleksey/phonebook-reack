# Телефонный справочник на React / 
#  Phonebook The React
 ##  Работает на базе node.js + mongodb
      настроена аутентификация для администрирования телефонного спавочника.    
 ## It works on the basis of node.js + mongodb
     authentication has been configured to administer the phonebook.
## Добавлен в репозитарий <a href="https://hub.docker.com/repository/docker/alex89102/phonebook/"> Docker Hub</a>
~~~bash
## docer-compose
           version: '3.8'
              services:
                # React приложение
                phonebook:
                  image: alex89102/phonebook:latest
                  container_name: phonebook #Название оставить как есть для корректной работы frontend+backend
                  env_file:
                    - .env
                 restart: always
                 ports:
                   - "80:80"       # http
                   - "443:443"     # https
                   - "5055:5055"   # https для backend
                 volumes:
                   - /opt/frontend/config.js:/usr/share/nginx/html/config.js # файл конфигурации с адресом backend
                   - ./certificates/:/etc/ssl/certs/                         # каталог с сертификатами
                 depends_on:
                  - mongo

                # MongoDB
                mongo:
                  image: mongo
                  container_name: mongo
                  restart: always
                  environment:
                    MONGO_INITDB_ROOT_USERNAME: root
                    MONGO_INITDB_ROOT_PASSWORD: example
                  ports:
                    - "27017:27017"
                   volumes:
                    - /opt/db:/data/db  # хранение базы данных на хосте

                # Mongo Express (админ-панель для MongoDB)
                mongo-express:
                  image: mongo-express
                  container_name: mongo-express
                  restart: always
                  ports:
                     - "8081:8081"
                  environment:
                     ME_CONFIG_MONGODB_SERVER: mongo               # Используйте этот адрес для подключения к MongoDB на хосте
                     ME_CONFIG_MONGODB_PORT: "27017"               # Порт MongoDB на хосте
                     ME_CONFIG_MONGODB_ADMINUSERNAME: root         #  Admin от MongoDB  
                     ME_CONFIG_MONGODB_ADMINPASSWORD: example      # пароль от MongoDB
                     ME_CONFIG_BASICAUTH_USERNAME: admin           # Имя пользователя для аутентификации в Mongo Express (по желанию)
                     ME_CONFIG_BASICAUTH_PASSWORD: admin_password  # Пароль пользователя для аутентификации в Mongo Express (по желанию)

## файл .env 
   создайте файл .env  с переменной для подключения backend к базе данных mangodb
 
       DB_USER=root
       DB_PASSWORD=example
       DB_HOST=mongo
       DB_PORT=27017
       DB_NAME=phonebook
## файл config.js
   создайте файл config.js для frontend с описанием для подключения к backend

    // public/config.js
    window.APP_CONFIG = {
    REACT_APP_BACKEND_URL: 'https://localhost:5055'    #адрес для обращения к backend с frontend
    };
~~~
