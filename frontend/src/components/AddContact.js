// AddContactPage.js
import React, { useState, useEffect } from 'react'; // Добавьте useEffect
import './AddContact.css';
import axios from 'axios';
import { contactsUrl } from './endpoints';
import { organizationsUrl } from './endpoints';

function AddContact() {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [newOrganization, setNewOrganization] = useState({ name: '' });
  const [isAddingNewOrganization, setIsAddingNewOrganization] = useState(false);
  const [contact, setContact] = useState({
    department: '',
    subdivision: '',
    office: '',
    fullName: '',
    position: '',
    officePhone: '',
    internalPhone: '',
    mobilePhone: '',
    email: ''
  });

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(`${organizationsUrl}`);
        setOrganizations(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке организаций:', error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let organizationId = selectedOrganization;

    if (!contact.fullName || !contact.position || !contact.officePhone || !contact.mobilePhone || !contact.email || !contact.department || !contact.office || !selectedOrganization) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }

  if (isAddingNewOrganization) {
    try {
      // Отправка данных новой организации на сервер
      const response = await axios.post(`${organizationsUrl}`, { name: newOrganization.name });
      // Использование _id новой организации для контакта
      organizationId = response.data._id;
    } catch (error) {
      console.error('Ошибка при добавлении организации:', error);
      return;
    }
  }

  
  // Сборка и отправка данных контакта, включая _id организации
  const contactData = { ...contact, organization: organizationId };
  try {
      await axios.post(`${contactsUrl}`, contactData);
      alert('Контакт успешно добавлен');
      setContact({
        department: '',
        subdivision: '',
        office: '',
        fullName: '',
        position: '',
        officePhone: '',
        internalPhone: '',
        mobilePhone: '',
        email: ''
      });
      setSelectedOrganization('');
      setNewOrganization({ name: '' });
      setIsAddingNewOrganization(false);
    } catch (error) {
      console.error('Ошибка добавления контакта:', error);
      alert('Произошла ошибка при добавлении контакта');
    }
  };
  

  return (
    <div className="container">
      <div className="container-list">
      <h2>Добавить контакт</h2>
      <form onSubmit={handleSubmit}>
      <select
              value={selectedOrganization}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedOrganization(value);
                setIsAddingNewOrganization(value === 'new');
              }}
            >
              <option value="">Выберите организацию</option>
              {organizations.map((org) => (
                <option key={org._id} value={org._id}>{org.name}</option>
              ))}
              <option value="new">Добавить новую организацию</option>
        </select>
            {isAddingNewOrganization && (
  <input
    type="text"
    value={newOrganization.name}
    onChange={(e) => setNewOrganization({ ...newOrganization, name: e.target.value })}
    placeholder="Название новой организации"
  />
)}
        <input type="text" name="department" value={contact.department} onChange={handleChange} placeholder="Департамент" required />
        <input type="text" name="subdivision" value={contact.subdivision} onChange={handleChange} placeholder="Отдел" />
        <input type="text" name="office" value={contact.office} onChange={handleChange} placeholder="Кабинет" />
        <input type="text" name="fullName" value={contact.fullName} onChange={handleChange} placeholder="ФИО" required />
        <input type="text" name="position" value={contact.position} onChange={handleChange} placeholder="Должность" required />
        <input type="text" name="officePhone" value={contact.officePhone} onChange={handleChange} placeholder="Городской телефон" required />
        <input type="text" name="internalPhone" value={contact.internalPhone} onChange={handleChange} placeholder="Внутренний телефон" />
        <input type="text" name="mobilePhone" value={contact.mobilePhone} onChange={handleChange} placeholder="Сотовый телефон" required />
        <input type="text" name="email" value={contact.email} onChange={handleChange} placeholder="e-mail" required />
        <button type="submit">Добавить</button>
      </form>
      </div>
    </div>
  );
}

export default AddContact;