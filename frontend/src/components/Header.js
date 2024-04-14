import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


function Header({ isLoggedIn, user, onLogin, onLogout, setModalBox, openProfileModal }) {
  return (
    <div className="Header">
      <div className="logo">Телефонный справочник</div>
      <div className="navigation">
        <ul>
          {isLoggedIn && <li><Link to="/">Главная</Link></li>}
          {isLoggedIn && <li><Link to="/add-contact">Добавить контакт</Link></li>} 
          {isLoggedIn && <li><Link to="/contacts">Изменить контакт</Link></li>}
          {isLoggedIn && <li><Link to="/import">Импортировать контакты</Link></li>}
          
        </ul>
      </div>
      <div className="auth">
        {isLoggedIn ? (
          <>
            <span>{user.name}</span>
            <button onClick={openProfileModal}>Профиль</button>
            <button onClick={onLogout}>Выход</button>
          </>
        ) : (
          <>
            <button onClick={() => setModalBox('Login')}>Вход</button>
           {/*  {<button onClick={() => setModalBox('Registration')}>Регистрация</button>} */}
          </>
        )}
      </div>
    </div>
  );
}

export default Header;