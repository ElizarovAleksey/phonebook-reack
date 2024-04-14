import React, { useState } from 'react';
import './ProfileModal.css';

function ProfileModal({ user, onClose, onChangePassword, onChangeEmail }) {
  
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      await onChangePassword(newPassword);
      setNewPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      await onChangeEmail(newEmail);
      setNewEmail('');
    } catch (error) {
      console.error('Error changing email:', error);
    }
  };

  return (
    <div className="profile-modal">
  <div className="profile-content">
    <>
      <h2>{user.login}</h2>
      <p><strong>Имя пользователя:</strong> {user.login}</p>
      <p><strong>Адрес электронной почты:</strong> {user.email}</p>
      <p><strong>Дата регистрации:</strong> {user.registrationDate}</p>

      <form onSubmit={handleSubmitPassword}>
        <input type="password" placeholder="Новый пароль" value={newPassword} onChange={handlePasswordChange} />
        <button type="submit">Изменить пароль</button>
      </form>

      <form onSubmit={handleSubmitEmail} style={{ marginTop: '10px' }}> {/* Добавляем отступ между формами */}
        <input type="email" placeholder="Новый адрес электронной почты" value={newEmail} onChange={handleEmailChange} />
        <button type="submit">Изменить почту</button>
      </form>

      <button onClick={onClose}>Закрыть</button>
    </>
  </div>
</div>
  );
}

export default ProfileModal;