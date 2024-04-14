// EditContact.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditContact.css'; 
import { editUrl } from './endpoints';
import { organizationsUrl } from './endpoints';

const EditContact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [formData, setFormData] = useState({
    office: '',
    fullName: '',
    organization: '',
    department: '',
    subdivision: '',
    position: '',
    officePhone: '',
    internalPhone: '',
    mobilePhone: '',
    email: ''

  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`${editUrl}/${id}`);
        setContact(response.data);
        setFormData({
          ...response.data,
          organization: response.data.organization._id // Сохраняем _id организации
        });
      } catch (error) {
        console.error('Ошибка при загрузке контакта:', error);
      }
    };
  
    fetchContact();
  }, [id]);
  
  const [organizations, setOrganizations] = useState([]);

useEffect(() => {
  // Загрузка списка организаций для выбора
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
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditClick = async () => {
    try {
      const response = await axios.put(`${editUrl}/${id}`, formData);
      alert('Контакт успешно обновлен');
      console.log('Контакт успешно обновлен:', response.data);
      
    } catch (error) {
      console.error('Ошибка при редактировании контакта:', error);
    }
  };

  if (!contact) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="edit-container">
    <div  className="edit-list">
      <h2>Редактирование контакта</h2>
      <form className="form-group">
      <div className="form-group">
          <label className="label">Кабинет:</label>
          <input className="input" type="text" name="office" value={formData.office} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="label">ФИО:</label>
          <input className="input" type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="label">Организация:</label>
          <select className="select" name="organization" value={formData.organization} onChange={handleInputChange}>
          {organizations.map((org) => (<option key={org._id} value={org._id}>{org.name}</option>))}
          </select>
        </div>
        <div className="form-group">
          <label className="label">Департамент:</label>
          <input className="input" type="text" name="department" value={formData.department} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="label">Отдел:</label>
          <input className="input" type="text" name="subdivision" value={formData.subdivision} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="label">Должность:</label>
          <input className="input" type="text" name="position" value={formData.position} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="label">Городской телефон:</label>
          <input className="input" type="text" name="officePhone" value={formData.officePhone} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="label">Внутренний телефон:</label>
          <input className="input" type="text" name="internalPhone" value={formData.internalPhone} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="label">Сотовый телефон:</label>
          <input className="input" type="text" name="mobilePhone" value={formData.mobilePhone} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label className="label">e-mail:</label>
          <input className="input" type="text" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <button type="button" onClick={handleEditClick}>Сохранить изменения</button>
      </form>
    </div>
    </div>
  );
};

export default EditContact;