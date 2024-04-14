import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* fetch('/config.js')
  .then((response) => response.json())
  .then((config) => {
    // Сохраняем конфигурацию для дальнейшего использования
    window.config = config;

  }); */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
