/* import React, { useState } from 'react';
import axios from 'axios';
import { searchUrl } from './endpoints';

const SearchContacts = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${searchUrl}`, {
        params: { q: searchQuery }
      });
      onSearch(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении поиска контактов:', error);
      alert('Произошла ошибка при поиске. Пожалуйста, попробуйте еще раз.'); // Информирование пользователя
    }
  };

  return (
    <div className='search-container'>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Введите запрос"
      />
      <button onClick={handleSearch}>
        Поиск
      </button>
    </div>
  );
};

export default SearchContacts; */

import React, { useState } from 'react';
import axios from 'axios';
import { searchUrl } from './endpoints';
import './SearchContacts.css'; // Импорт стилей

const SearchContacts = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${searchUrl}`, {
        params: { q: searchQuery, field: searchField }
      });
      onSearch(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении поиска контактов:', error);
      alert('Произошла ошибка при поиске. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className='search-container'>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Введите запрос"
      />
      <select value={searchField} onChange={handleFieldChange}>
        <option value="">Все поля</option>
        <option value="fullName">Имя</option>
        <option value="phoneNumber">Телефон</option>
        <option value="department">Отдел</option>
        <option value="position">Должность</option>
        <option value="room">Кабинет</option>
      </select>
      <button onClick={handleSearch}>
        Поиск
      </button>
    </div>
  );
};

export default SearchContacts;
