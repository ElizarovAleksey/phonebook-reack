/* //contactControllers

const Contact = require('./models/Contact');

// Получение всех контактов
async function getContacts(req, res) {
  try {
    const contacts = await Contact.find()
      .populate('organization', 'name') // Предполагаем, что у вас есть поле organization в модели Contact
      .exec();
    res.json(contacts);
  } catch (error) {
    console.error('Ошибка при получении списка контактов:', error);
    res.status(500).send('Ошибка сервера');
  }
}

module.exports = { getContacts }; */
/* 
const Contact = require('./models/Contact');

async function getContacts(req, res) {
  try {
    const contacts = await Contact.find()
      .populate('organization', 'name')
      .sort({ organization: 1, department: 1, subdivision: 1 }) // Сортировка по организации, департаменту и отделу
      .exec();

    res.json(contacts);
  } catch (error) {
    console.error('Ошибка при получении списка контактов:', error);
    res.status(500).send('Ошибка сервера');
  }
}

module.exports = { getContacts }; */

// contactControllers.js

const Contact = require('./models/Contact');

// Получение всех контактов
async function getContacts(req, res) {
  try {
    const contacts = await Contact.find()
      .populate('organization', 'name') // Присоединяем поле organization из модели Contact
      .sort({ organization: 1, department: 1, subdivision: 1, fullName: 1 }) // Сортировка контактов
      .exec();
      console.log('Контакты из базы данных:', contacts);
    res.json(contacts);
  } catch (error) {
    console.error('Ошибка при получении списка контактов:', error);
    res.status(500).send('Ошибка сервера');
  }
}

module.exports = { getContacts };
