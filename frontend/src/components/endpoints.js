//endpoint.js
//const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const backendBaseUrl = window.APP_CONFIG.REACT_APP_BACKEND_URL;
//const backendBaseUrl = `${process.env.REACT_APP_BACKEND_URL}`;
const apiUrl = `${backendBaseUrl}/api`;
console.log(window.APP_CONFIG.REACT_APP_BACKEND_URL)

export const loginUrl = `${apiUrl}/login`;
export const reginUrl = `${apiUrl}/registration`;
export const contactsUrl = `${apiUrl}/contacts`;
export const searchUrl = `${contactsUrl}/search`; 
export const editUrl = `${apiUrl}/edit`;
export const deleteUrl = `${apiUrl}/delete-contacts`; 
export const changePasswordUrl = `${apiUrl}/change-password`;
export const changeEmailUrl = `${apiUrl}/change-email`;
export const organizationsUrl = `${apiUrl}/organizations`;
export const paginationsUrl = `${apiUrl}/pagination`;
export const uploadUrl = `${apiUrl}/upload`;
