import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import AddContact from './components/AddContact';
import ContactsList from './components/ContactsList';
import EditContact from './components/EditContact';
import ModalBox from './components/ModalBox';
import Login from './components/login';
import Registration from './components/Registration';
import ProfileModal from './components/ProfileModal';
import ImportPage from './components/ImportPage';
import { RoleProvider } from './components/RoleContext';

function App() {
  const [modalBox, setModalBox] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  

  const handleLogin = (userData) => {
    setUser(userData.user);
    setIsLoggedIn(true);
    setModalBox(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <RoleProvider>
    <Router>
      <div className="App">
        <Header
          isLoggedIn={isLoggedIn}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          setModalBox={setModalBox}
          openProfileModal={openProfileModal}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/contacts" element={<ContactsList />} />
          <Route path="/edit-contact/:id" element={<EditContact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/import" element={<ImportPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<ProfileModal />} />
        </Routes>
        {modalBox === 'Login' && (
            <ModalBox setModalBox={setModalBox}>
              <Login onLogin={handleLogin} />
            </ModalBox>
          )}
        {modalBox === 'Registration' && (
            <ModalBox setModalBox={setModalBox}>
              <Registration />
            </ModalBox>
          )}
        <Footer className="Footer" />
        {showProfileModal && (
          <ProfileModal
            user={user}
            onClose={closeProfileModal}
          />
        )}
      </div>
    </Router>
    </RoleProvider>
  );
}

export default App;
