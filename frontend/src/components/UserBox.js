import React from 'react';
import './UserBox.css';

function UserBox({ isLoggedIn, user, setModalBox, handleLogout }) {
  return (
    <div className="UserBox">
      {isLoggedIn ? (
        <button onClick={handleLogout}>Выйти</button>
      ) : (
        <>
          <button onClick={() => setModalBox('Login')}>Вход</button>
          <button onClick={() => setModalBox('Registration')}>Регистрация</button>
        </>
      )}
      {isLoggedIn && <span>{user}</span>}
    </div>
  );
}

export default UserBox;