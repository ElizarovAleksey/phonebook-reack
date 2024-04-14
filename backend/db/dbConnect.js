require('dotenv').config();
const mongoose = require('mongoose');

// Использование дополнительных переменных окружения для гибкости конфигурации
const dbUser = encodeURIComponent(process.env.DB_USER); // Используйте encodeURIComponent для безопасности
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD); // Используйте encodeURIComponent для безопасности
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME || 'phonebook';

// Формирование строки подключения с поддержкой аутентификации
const URLDB = process.env.MONGODB_SERVER_URL || `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;

//const URLDB = process.env.MONGODB_SERVER_URL || `mongodb://${dbHost}:${dbPort}/${dbName}`;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(URLDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Подключен к MongoDB');
  } catch (error) {
    console.error('Не удалось подключиться к MongoDB:', error);
  }
};

module.exports = connectToDatabase;