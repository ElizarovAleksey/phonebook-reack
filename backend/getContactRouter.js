// getContactRouter.js
const express = require('express');
const router = express.Router();
const Contact = require('./models/Contact');
const { getContacts } = require('./contactControllers');

router.get('/', getContacts); // Получение всех контактов




module.exports = router;