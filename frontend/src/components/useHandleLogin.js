// useHandleLogin.js
import { useState } from 'react';

const useHandleLogin = (setErrorMessage, setUserRole) => {
    const handleLogin = (userData) => {
        const { user, role } = userData;
        // Добавляем обработку роли пользователя
        if (!role) {
            // Если роль не определена, выводим сообщение об ошибке
            setErrorMessage('Роль пользователя не определена');
            return;
        }
        // Устанавливаем роль пользователя
        setUserRole(role);
        // Ваши действия при успешной авторизации...
    };

    return handleLogin;
};

export default useHandleLogin;