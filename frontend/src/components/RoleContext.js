// RoleContext.js

import React, { useState, useEffect, createContext, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Здесь происходит декодирование токена и установка роли
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }
  }, []);

  console.log('User role:', userRole);

  const setRole = (role) => {
    setUserRole(role);
  };

  const logout = () => {
    setRole(null); // Сброс роли при выходе
    // Дополнительные действия, которые могут быть связаны с выходом
  };

  return (
    <RoleContext.Provider value={{ userRole, setRole, logout }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const useRoleSetter = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRoleSetter must be used within a RoleProvider');
  }
  return context.setRole;
};