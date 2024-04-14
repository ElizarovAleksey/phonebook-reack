//login.js
import React, { useState } from 'react';
import { loginUrl } from './endpoints';
import './Login.css';

import { useRoleSetter } from './RoleContext'; // Импортируем хук для установки роли пользователя

function Login({ onLogin }) {
    const [errorMessage, setErrorMessage] = useState('');
    const setRole = useRoleSetter(); // Используем хук для установки роли пользователя

    const Log = () => {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        const data = {
            login: login,
            password: password
        };

        //console.log(data); // Вывод данных

        const api = `${loginUrl}/`;
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(result => {
            if (!result.ok) {
                throw new Error('Неверный логин или пароль!');
            }
            return result.json();
        })
        .then((result) => {
            console.log(result);
            localStorage.setItem('token', result.token);
            if (onLogin) {
                onLogin(result);
                setRole(result.user.role); // Устанавливаем роль пользователя после успешной авторизации
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            setErrorMessage('Неверный логин или пароль!');
        });
    };

    return (
        <>
            <h1>Логин</h1>
            <input id='login' type='text' placeholder='Логин'/>
            <input id='password' type='password' placeholder='Пароль'/>
            <button type='button' onClick={Log}>Войти</button>
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
}

export default Login;