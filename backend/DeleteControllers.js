// DeleteControllers.js
const express = require('express');
const router = express.Router();
const Contact = require('./models/Contact'); // Подключаем модель контактов

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Контакт не найден' });
    }

    res.json({ message: 'Контакт успешно удален', contact: deletedContact });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении контакта', error: error.message });
  }
};

module.exports = { deleteContact };