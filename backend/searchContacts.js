// searchContacts.js
const Contact = require('./models/Contact'); // Подключаем модель контактов

// Контроллер для поиска контактов по имени
const searchContactsByName = async (req, res) => {
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
  
  module.exports = { searchContactsByName };