//contactControllers

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

module.exports = { getContacts };