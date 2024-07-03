/* //paginationControllers
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

module.exports = router; */

const express = require('express');
const router = express.Router();
const Contact = require('./models/Contact'); // Подключаем модель контактов

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const filter = req.query.filter || ''; // Фильтрация по ID организации
    const search = req.query.search || ''; // Поисковый запрос
    const field = req.query.field || ''; // Поле для поиска

    // Условия для фильтрации
    let searchConditions = {};

    // Добавляем условие фильтрации по ID организации, если указано
    if (filter) {
        searchConditions.organization = filter;
    }

    // Условия для поиска
    if (search && field) {
        // Поиск по конкретному полю
        searchConditions[field] = { $regex: search, $options: 'i' }; // Игнорирование регистра
    } else if (search) {
        // Поиск по всем полям, если поле не указано
        searchConditions = {
            $or: [
                { fullName: { $regex: search, $options: 'i' } },
                { internalPhone: { $regex: search, $options: 'i' } },
                { officePhone: { $regex: search, $options: 'i' } },
                { mobilePhone: { $regex: search, $options: 'i' } },
                { department: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } },
                { office: { $regex: search, $options: 'i' } }
            ]
        };
    }

    try {
        // Подсчёт общего количества элементов с учётом условий
        const totalItems = await Contact.countDocuments(searchConditions);

        // Получение данных с учётом поиска, фильтрации и пагинации
        const items = await Contact.find(searchConditions)
            .populate('organization') // Заполняем данные организации
            .skip((page - 1) * size)
            .limit(size);

        res.json({
            items,
            totalItems,
        });
    } catch (error) {
        console.error('Ошибка при выполнении поиска и пагинации:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
