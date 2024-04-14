// routes.js
const express = require('express');
const router = express.Router();
const {addContact} = require('./createControllers');
const contactRouter = require('./getContactRouter');
const editContactsRoutes = require('./editContactsRoutes');
const {searchContactsByName} = require('./searchContacts');
const authController = require('./authController');
const registrationController = require('./registrationController');
const userController = require('./userController');
const { deleteContact } = require('./DeleteControllers');
const paginationControllers = require('./paginationControllers');
const organizationsRouter = require('./organizationsRouter');
const uploadController = require('./uploadControllers');
router.post('/login', authController.login);
router.post('/registration', registrationController.register);
router.post('/change-password/:id', userController.changePassword);
router.post('/change-email/:id', userController.changeEmail);

// Маршрут для добавления контакта
router.post('/contacts', addContact);

// Маршрут для поиска контактов по имени
router.get('/contacts/search', searchContactsByName);

// Маршрут для получения всех контактов
router.use('/contacts', contactRouter);

// Маршрут для редактирования контакта
router.use('/edit', editContactsRoutes); // Используем PUT метод

// Маршрут для удаления контакта
router.delete('/delete-contacts/:id', deleteContact);

router.use('/organizations', organizationsRouter);
router.use('/pagination', paginationControllers);

router.use('/upload', uploadController);

module.exports = router;