const Contact = require('./models/Contact'); // Подключаем модель контактов
const Organization = require('./models/Organization');

async function addContact(req, res) {
  console.log(req.body);

  try {
    let organizationId = req.body.organization; // Получаем идентификатор организации из запроса

    // Проверяем, нужно ли добавлять новую организацию
    if (req.body.isNewOrganization) {
      const newOrganization = new Organization({ name: req.body.newOrganizationName });
      const savedOrganization = await newOrganization.save();
      organizationId = savedOrganization._id; // Присваиваем _id новой организации
      console.log('Создана новая организация с ID:', organizationId);
    }

    // Удаляем лишние поля из req.body, если они есть
    delete req.body.isNewOrganization;
    delete req.body.newOrganizationName;

    // Добавляем поле organization с идентификатором
    req.body.organization = organizationId;

    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    console.log('Добавлен новый контакт:', savedContact);

    res.status(201).send('Контакт успешно добавлен');
  } catch (error) {
    console.error("Ошибка при добавлении контакта:", error);
    res.status(500).send('Ошибка сервера при добавлении контакта');
  }
}

module.exports = { addContact };