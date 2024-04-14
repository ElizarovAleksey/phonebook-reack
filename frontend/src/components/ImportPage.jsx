// ImportPage.js
import React, { useState } from 'react';
import DownloadTemplate from './DownloadTemplate';
import './ImportPage.css';
import { uploadUrl } from './endpoints';

function ImportPage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Пожалуйста, сначала выберите файл!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${uploadUrl}`, {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      alert('Файл успешно загружен!');
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
      alert('Ошибка при загрузке файла.');
    }
  };

  return (
    <div className="upload-container">
    <div className="container">
      <h1 className="title">Загрузка контактов</h1>
      <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
      <button onClick={handleFileUpload}>Загрузить файл</button>
      <div className="containerDownload"> 
      <DownloadTemplate />
    </div>
    </div>
    </div>
  );
}

export default ImportPage;