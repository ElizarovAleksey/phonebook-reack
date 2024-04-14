//Registration.js
import React, { useState, useEffect } from 'react';
import './Registration.css';
import { reginUrl } from './endpoints';

function Registration() {
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    console.log("isSubmitting:", isSubmitting); // Проверяем, как изменяется isSubmitting
  }, [isSubmitting]);

  function closeSuccessModal() {
    setSuccess(false);
  }

  function handleRegistration() {
    setIsSubmitting(true); // Устанавливаем флаг отправки данных на сервер

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const data = {
      login: login,
      password: password,
      email: email,
      role: 'user'
    };

    const api = `${reginUrl}/`;
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(result => result.json())
      .then((result) => {
        console.log(result);
        if (result.message === "Вы успешно зарегистрировались!") {
          setIsRegistered(true);
          setSuccess(true);
          console.log('isRegistered:', isRegistered);
          // Устанавливаем таймер для автоматического закрытия окна через 10 секунд
          setTimeout(closeSuccessModal, 10000);
          // Закрываем всю форму регистрации
          setIsSubmitting(false);
        } else {
          console.log("Registration was not successful.");
        }
      })
      .catch((error) => {
        console.error('Error submitting registration:', error);
      })
      .finally(() => {
        setIsSubmitting(false); // Сбрасываем флаг отправки данных на сервер
      })
      .then(() => {
        console.log('Registration request completed.');
      });
  }

  return (
    <>
      {!success && (
        <>
          <h1>Регистрация</h1>
          <input id='login' type='text' placeholder='Логин' />
          <input id='password' type='password' placeholder='Пароль' />
          <input id='email' type='email' placeholder='Почта' />
          <button onClick={handleRegistration} disabled={isSubmitting || isRegistered}>Сохранить</button>
        </>
      )}
      {success && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeSuccessModal}>&times;</span>
            <p>Успешная регистрация!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Registration;