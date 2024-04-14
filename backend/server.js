// server.js
const express = require('express');
require('dotenv').config();
const connectToDatabase = require('./db/dbConnect');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const routes = require('./routes'); // Подключаем основные маршруты

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Middleware для CORS
app.use(cors());

// Подключаем основные маршруты
app.use('/api', routes);

const start = async () => {
  await connectToDatabase(); // Подключаемся к базе данных перед запуском сервера
  app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`));
};

start();
