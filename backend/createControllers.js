const Contact = require('./models/Contact'); // Подключаем модель контактов
const Organization = require('./models/Organization');

async function addContact(req, res) {
  console.log(req.body);
  // Предположим, новая организация передаётся специальным образом или в req.body есть флаг
  if (req.body.isNewOrganization) {
    // Логика создания новой организации и получения её _id
    const newOrganization = new Organization({ name: req.body.newOrganizationName });
    const savedOrganization = await newOrganization.save();
    req.body.organization = savedOrganization._id; // Присваиваем _id новой организации
  }

  // Удаление лишних полей из req.body, если они есть
  delete req.body.isNewOrganization;
  delete req.body.newOrganizationName;

  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).send('Контакт успешно добавлен');
  } catch (error) {
    console.error("Ошибка при добавлении контакта:", error);
    res.status(500).send('Ошибка сервера при добавлении контакта');
  }
}

module.exports = { addContact };