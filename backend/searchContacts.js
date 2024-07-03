// searchContacts.js
const Contact = require('./models/Contact'); // Подключаем модель контактов

// Контроллер для поиска контактов по имени
/* const searchContactsByName = async (req, res) => {
  const searchQuery = req.query.q; // Получаем поисковый запрос из query параметров

  try {
    const searchResults = await Contact.find({
      fullName: { $regex: new RegExp(searchQuery, 'i') } // Поиск по имени, игнорируя регистр
    }).populate('organization', 'name') // Заполняем данные организации, возвращаем только поле name
    .exec(); // Выполняем запрос

    res.json(searchResults);
  } catch (error) {
    console.error('Ошибка при поиске контактов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
  
  module.exports = { searchContactsByName }; */

  // Контроллер для поиска контактов по различным параметрам
const searchContacts = async (req, res) => {
  const { q, field } = req.query; // Получаем поисковый запрос и поле для поиска из query параметров

  // Условия для поиска
  const searchConditions = [];
  
  if (field === 'fullName' || !field) {
    searchConditions.push({ fullName: { $regex: new RegExp(q, 'i') } });
  }
  if (field === 'officePhone' || !field) {
    searchConditions.push({ officePhone: { $regex: new RegExp(q, 'i') } });
  }
  if (field === 'department' || !field) {
    searchConditions.push({ department: { $regex: new RegExp(q, 'i') } });
  }
  if (field === 'position' || !field) {
    searchConditions.push({ position: { $regex: new RegExp(q, 'i') } });
  }
  if (field === 'room' || !field) {
    searchConditions.push({ room: { $regex: new RegExp(q, 'i') } });
  }

  try {
    const searchResults = await Contact.find({
      $or: searchConditions // Поиск по любому из указанных условий
    }).populate('organization', 'name') // Заполняем данные организации, возвращаем только поле name
    .exec(); // Выполняем запрос

    res.json(searchResults);
  } catch (error) {
    console.error('Ошибка при поиске контактов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { searchContacts };