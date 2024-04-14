import React, { useState } from 'react';
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

export default SearchContacts;