// server.js
const express = require('express');
require('dotenv').config();
const connectToDatabase = require('./db/dbConnect');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');
const fs = require('fs');
const PORT = process.env.PORT || 5000;
const routes = require('./routes'); // Подключаем основные маршруты

const options = {
  key: fs.readFileSync('/etc/ssl/certs/server.key'),     // Путь к ключу внутри контейнера
  cert: fs.readFileSync('/etc/ssl/certs/server.crt')    // Путь к сертификату внутри контейнера
};

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Middleware для CORS
app.use(cors());

// Подключаем основные маршруты
app.use('/api', routes);

// Создание HTTPS-сервера
https.createServer(options, app).listen(5050, () => {
  console.log('Сервер запущен на порту 5050');
});

const start = async () => {
  await connectToDatabase(); // Подключаемся к базе данных перед запуском сервера
  app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`));
};

start();
