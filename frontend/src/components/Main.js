//main.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css';
import PhoneDirectory from './PhoneDirectory';
import { contactsUrl } from './endpoints';

const Main = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${contactsUrl}`);
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении контактов:', error);
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="Main">
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div>
          <PhoneDirectory data={contacts} />
        </div>
      )}
    </div>
  );
}

export default Main;