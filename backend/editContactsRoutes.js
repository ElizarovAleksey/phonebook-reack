//editContactsRoutes
const express = require('express');
const router = express.Router();
const Contact = require('./models/Contact'); // Предположим, что вы используете модель Contact для работы с контактами

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findById(id).populate('organization', 'name');
        if (!contact) {
            return res.status(404).json({ message: 'Контакт не найден' });
        }
        res.json(contact);
    } catch (error) {
        console.error('Ошибка при получении контакта:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Маршрут для обновления контакта по его ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
        let contact = await Contact.findByIdAndUpdate(id, newData, { new: true }).populate('organization', 'name');
        if (!contact) {
            return res.status(404).json({ message: 'Контакт не найден' });
        }
        res.json(contact);
    } catch (error) {
        console.error('Ошибка при обновлении контакта:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;