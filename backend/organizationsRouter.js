// organizationsRouter.js
const express = require('express');
const router = express.Router();
const Organization = require('./models/Organization');

// Маршрут для получения всех организаций
router.get('/', async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    console.error('Ошибка при получении организаций:', error);
    res.status(500).send('Ошибка при получении организаций');
  }
});

// Маршрут для создания новой организации
router.post('/', async (req, res) => {
  try {
    const newOrganization = new Organization(req.body);
    const savedOrganization = await newOrganization.save();
    res.status(201).json(savedOrganization);
  } catch (error) {
    console.error('Ошибка при создании организации:', error);
    res.status(500).send('Ошибка при создании организации');
  }
});

module.exports = router;