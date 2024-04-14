import React from 'react';
import * as XLSX from 'xlsx';

const DownloadTemplate = () => {
  const handleDownload = () => {
    // Создаем рабочую книгу и лист
    const wb = XLSX.utils.book_new();
    const ws_data = [
        ["organization Организация", "department Департамент", "subdivision Отдел", "office Кабинет", "fullName ФИО", "position Должность", "officePhone Гор. номер", "internalPhone Внутр. номер", "mobilePhone Моб. номер", "email Эл. адрес"]
    ];
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Добавляем лист в книгу
    XLSX.utils.book_append_sheet(wb, ws, 'Шаблон');

    // Генерируем XLSX файл и сохраняем его
    XLSX.writeFile(wb, 'contacts_template.xlsx');
  };

  return (
    <button onClick={handleDownload}>Скачать шаблон в Excel</button>
  );
};

export default DownloadTemplate;