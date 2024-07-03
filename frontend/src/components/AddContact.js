import React, { useState, useEffect } from 'react';
import './AddContact.css';
import axios from 'axios';
import { contactsUrl, organizationsUrl } from './endpoints';

function AddContact() {
  const [organizations, setOrganizations] = useState([]); // Состояние для списка организаций
  const [selectedOrganization, setSelectedOrganization] = useState(''); // Выбранная организация
  const [newOrganization, setNewOrganization] = useState({ name: '' }); // Новая организация
  const [isAddingNewOrganization, setIsAddingNewOrganization] = useState(false); // Флаг добавления новой организации
  const [contact, setContact] = useState({ // Состояние для данных нового контакта
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

  // Загрузка списка организаций при загрузке страницы
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(organizationsUrl);
        setOrganizations(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке организаций:', error);
      }
    };

    fetchOrganizations();
  }, []);

  // Обработчик изменения значений полей ввода
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация обязательных полей
    if (!contact.fullName || !contact.position || !contact.officePhone || !contact.mobilePhone || !contact.email || !contact.department || !contact.office || !selectedOrganization) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    let organizationId = selectedOrganization;

    // Добавление новой организации, если выбрано соответствующее действие
    if (isAddingNewOrganization) {
      try {
        // Отправка запроса на сервер для добавления новой организации
        const response = await axios.post(organizationsUrl, { name: newOrganization.name });
        organizationId = response.data._id; // Использование _id новой организации
        setOrganizations(prevOrgs => [...prevOrgs, response.data]); // Добавление новой организации в список состояния
      } catch (error) {
        console.error('Ошибка при добавлении организации:', error);
        return;
      }
    }

    // Формирование данных нового контакта, включая _id организации
    const contactData = { ...contact, organization: organizationId };

    try {
      // Отправка запроса на сервер для добавления контакта
      await axios.post(contactsUrl, contactData);
      alert('Контакт успешно добавлен.');
      // Очистка формы после успешного добавления
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
      setSelectedOrganization(''); // Сброс выбранной организации
      setNewOrganization({ name: '' }); // Сброс данных новой организации
      setIsAddingNewOrganization(false); // Сброс флага добавления новой организации
      console.log('Новый контакт добавлен, обновляем список контактов');
      
    } catch (error) {
      console.error('Ошибка при добавлении контакта:', error);
      alert('Произошла ошибка при добавлении контакта.');
    }
  };

  return (
    <div className="container">
      <div className="container-list">
        <h2>Добавить контакт</h2>
        <form onSubmit={handleSubmit}>
          {/* Выбор организации */}
          <select
            value={selectedOrganization}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedOrganization(value);
              setIsAddingNewOrganization(value === 'new'); // Показать поле для новой организации при выборе "Добавить новую организацию"
            }}
          >
            <option value="">Выберите организацию</option>
            {organizations.map(org => (
              <option key={org._id} value={org._id}>{org.name}</option>
            ))}
            <option value="new">Добавить новую организацию</option>
          </select>

          {/* Поле для ввода названия новой организации, если выбрано добавление новой организации */}
          {isAddingNewOrganization && (
            <input
              type="text"
              value={newOrganization.name}
              onChange={(e) => setNewOrganization({ ...newOrganization, name: e.target.value })}
              placeholder="Название новой организации"
            />
          )}

          {/* Поля для ввода данных контакта */}
          <input type="text" name="department" value={contact.department} onChange={handleChange} placeholder="Департамент" required />
          <input type="text" name="subdivision" value={contact.subdivision} onChange={handleChange} placeholder="Отдел" />
          <input type="text" name="office" value={contact.office} onChange={handleChange} placeholder="Кабинет" />
          <input type="text" name="fullName" value={contact.fullName} onChange={handleChange} placeholder="ФИО" required />
          <input type="text" name="position" value={contact.position} onChange={handleChange} placeholder="Должность" required />
          <input type="text" name="officePhone" value={contact.officePhone} onChange={handleChange} placeholder="Городской телефон" required />
          <input type="text" name="internalPhone" value={contact.internalPhone} onChange={handleChange} placeholder="Внутренний телефон" />
          <input type="text" name="mobilePhone" value={contact.mobilePhone} onChange={handleChange} placeholder="Мобильный телефон" required />
          <input type="text" name="email" value={contact.email} onChange={handleChange} placeholder="E-mail" required />

          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
}

export default AddContact;
