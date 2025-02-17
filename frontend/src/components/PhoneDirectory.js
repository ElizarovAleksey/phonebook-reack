import React, { useState, useEffect } from 'react';
import './PhoneDirectory.css';
import { paginationsUrl } from './endpoints';
import { organizationsUrl } from './endpoints';

// Определяем функцию для группировки данных
function groupData(data) {
  const groupedData = {};
  data.forEach(employee => {
    const orgId = employee.organization ? employee.organization._id : 'Без организации'; 
    if (!groupedData[orgId]) {
      groupedData[orgId] = {};
    }
    if (!groupedData[orgId][employee.department]) {
      groupedData[orgId][employee.department] = {};
    }
    if (!groupedData[orgId][employee.department][employee.subdivision]) {
      groupedData[orgId][employee.department][employee.subdivision] = [];
    }
    groupedData[orgId][employee.department][employee.subdivision].push(employee);
  });
  return groupedData;
}

const PhoneDirectory = () => {
  const [groupedData, setGroupedData] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [organizations, setOrganizations] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams({
      page: currentPage,
      size: contactsPerPage,
      filter, 
      search: searchQuery, // Поисковый запрос
    }).toString();
  
    const fetchFilteredContacts = async () => {
      try {
        const response = await fetch(`${paginationsUrl}?${queryParams}`);
        const { items, totalItems } = await response.json();
        setGroupedData(groupData(items));
        setTotalItems(totalItems);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };
    fetchFilteredContacts();
  }, [currentPage, contactsPerPage, filter, searchQuery]);

  useEffect(() => {
    const initialExpandedGroups = {};
  
    Object.keys(groupedData).forEach(orgId => {
      initialExpandedGroups[orgId] = {};
  
      Object.keys(groupedData[orgId]).forEach(dept => {
        initialExpandedGroups[orgId][dept] = {};
  
        Object.keys(groupedData[orgId][dept]).forEach(sub => {
          initialExpandedGroups[orgId][dept][sub] = true; 
        });
      });
    });
  
    setExpandedGroups(initialExpandedGroups);
  }, [groupedData]);

  useEffect(() => {
    const fetchOrganizationNames = async () => {
      try {
        const response = await fetch(`${organizationsUrl}`);
        const organizationsData = await response.json();
        const organizationsMap = organizationsData.reduce((acc, org) => ({ ...acc, [org._id]: org.name }), {});
        setOrganizations(organizationsMap);
      } catch (error) {
        console.error('Ошибка при загрузке организаций:', error);
      }
    };
    fetchOrganizationNames();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalItems / contactsPerPage);

  const toggleGroup = (orgId, dept, sub = null) => {
    setExpandedGroups(prevState => {
      let newState = JSON.parse(JSON.stringify(prevState)); // Глубокое копирование для избегания мутации
  
      if (!newState[orgId]) newState[orgId] = {};
      if (!newState[orgId][dept]) newState[orgId][dept] = {};
  
      if (sub === null) {
        newState[orgId][dept] = !(newState[orgId][dept] || false);
      } else {
        newState[orgId][dept][sub] = !(newState[orgId][dept][sub] || false);
      }
      return newState;
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  return (
    <div className="phone-directory">
      <div className="search-controls">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select onChange={handleFilterChange} value={filter}>
          <option value="">Все организации</option>
          {Object.keys(organizations).map(orgId => (
            <option key={orgId} value={orgId}>{organizations[orgId]}</option>
          ))}
        </select>
      </div>

      {Object.keys(groupedData).map(orgId => (
        <React.Fragment key={orgId}>
          <h2>{organizations[orgId] || 'Загрузка...'}</h2>
          {groupedData[orgId] && Object.keys(groupedData[orgId]).map(dept => (
            <React.Fragment key={dept}>
              <h3 onClick={() => toggleGroup(orgId, dept)}>{dept}</h3>
              {groupedData[orgId][dept] && Object.keys(groupedData[orgId][dept]).map(sub => (
                <div key={sub}>
                  <h4 className="h4-toggle" onClick={() => toggleGroup(orgId, dept, sub)}>
                    {sub}
                    <span>{expandedGroups[orgId] && expandedGroups[orgId][dept] && expandedGroups[orgId][dept][sub] ? 'Скрыть' : 'Раскрыть'}</span>
                  </h4>
                  {expandedGroups[orgId]?.[dept]?.[sub] && (
                    <table>
                      <thead>
                        <tr>
                          <th>ФИО</th>
                          <th>Должность</th>
                          <th>Рабочий номер</th>
                          <th>Городской номер</th>
                          <th>Мобильный номер</th>
                          <th>Email</th>
                          <th>Отдел</th>
                          <th>Каб.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedData[orgId][dept][sub].map(employee => (
                          <tr key={employee._id} className="contact-row">
                            <td>{employee.fullName}</td>
                            <td>{employee.position}</td>
                            <td>{employee.internalPhone}</td>
                            <td>{employee.officePhone}</td>
                            <td>{employee.mobilePhone}</td>
                            <td>{employee.email}</td>
                            <td>{employee.subdivision}</td>
                            <td>{employee.office}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}

      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>Назад</button>
        <span>Страница {currentPage} из {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>Вперед</button>
        <select value={contactsPerPage} onChange={(e) => setContactsPerPage(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </div>
  );
};

export default PhoneDirectory;
