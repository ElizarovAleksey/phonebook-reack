//uploadControllers
const express = require('express');
const multer = require('multer');
const router = express.Router();
const xlsx = require('xlsx');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const Contact = require('./models/Contact');
const Organization = require('./models/Organization'); // Предположим, что у вас есть модель для организаций

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = xlsx.readFile(req.file.path);
    const sheet = file.Sheets[file.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    fs.unlinkSync(req.file.path); // Удаляем файл после обработки

    const contactsData = data.slice(1); // Пропускаем заголовки

    const updates = contactsData.map(async row => {
      const [orgName, department, subdivision, office, fullName, position, officePhone, internalPhone, mobilePhone, email] = row;

      let organization = await Organization.findOneAndUpdate(
        { name: orgName },
        { $setOnInsert: { name: orgName } },
        { upsert: true, new: true }
      );

      // Использование findOneAndUpdate для обновления контакта или добавления нового
      return Contact.findOneAndUpdate(
        { fullName, email }, // Уникальный ключ
        {
          organization: organization._id,
          department,
          subdivision,
          office,
          fullName,
          position,
          officePhone,
          internalPhone,
          mobilePhone,
          email
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    });

    const results = await Promise.all(updates);
    res.send({ success: true, message: `Processed ${results.length} contacts.` });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send({ success: false, message: 'Failed to process file', error: error.message });
  }
});
module.exports = router;
