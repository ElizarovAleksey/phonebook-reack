//paginationControllers
const express = require('express');
const router = express.Router();

// модель Contact, для запросов к базе данных
const Contact = require('./models/Contact');

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const filter = req.query.filter || ''; // Например, ID организации
    const search = req.query.search || ''; // Поисковый запрос

  // Формирование условий поиска и фильтрации
  let searchConditions = {
    ...(filter && { organization: filter }), // Пример фильтрации по ID организации
    ...(search && { fullName: { $regex: search, $options: 'i' } }), // Поиск по имени сотрудника
  };

  try {
    // Подсчёт общего количества элементов с учётом условий
    const totalItems = await Contact.countDocuments(searchConditions);

    // Получение данных с учётом поиска, фильтрации и пагинации
    const items = await Contact.find(searchConditions)
        .populate('organization') //
        .skip((page - 1) * size)
        .limit(size);

    res.json({
      
      items,
      totalItems,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;