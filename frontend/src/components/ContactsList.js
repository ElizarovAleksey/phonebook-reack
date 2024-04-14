import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactsList.css';
import SearchContacts from './SearchContacts';
import { Link } from 'react-router-dom';
import { contactsUrl } from './endpoints';
import { deleteUrl } from './endpoints';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(contactsUrl);
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении контактов:', error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleSearch = (searchResults) => {
    setContacts(searchResults);
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`${deleteUrl}/${contactId}`);
      setContacts(contacts.filter(contact => contact._id !== contactId));
      alert('Контакт успешно удален');
    } catch (error) {
      console.error('Ошибка при удалении контакта:', error);
      alert('Произошла ошибка при удалении контакта. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div className="contacts-container">
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="contacts-list">
          <h1>Список контактов</h1>
          <div className="search-container">
            <SearchContacts onSearch={handleSearch} />
          </div>
          <ul>
            {contacts.map(contact => (
              <li key={contact._id}>
                <p>Кабинет: {contact.office}</p>
                <p>ФИО: {contact.fullName}</p>
                <p>Организация: {contact.organization?.name || 'Организация не указана'}</p>
                <p>Департамент: {contact.department}</p>
                <p>Отдел: {contact.subdivision}</p>
                <p>Должность: {contact.position}</p>
                <p>Городской телефон: {contact.officePhone}</p>
                <p>Внутренний телефон: {contact.internalPhone}</p>
                <p>Сотовый телефон: {contact.mobilePhone}</p>
                <p>e-mail: {contact.email}</p>
                <button onClick={() => handleDeleteContact(contact._id)}>Удалить контакт</button>
                <Link to={`/edit-contact/${contact._id}`} className="my-link">Редактировать контакт</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactsList;