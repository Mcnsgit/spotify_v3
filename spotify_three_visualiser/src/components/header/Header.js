import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './Header.scss';
import SearchBar from './trackSearch/trackSearch'; // Ensure correct import path
import UserDetails from './userInfo/user'; // Ensure correct import path
import { AppProvider } from '../../utils/AppContextProvider'; // Ensure correct import path

const Header = () => {
  const [{ userInfo }] = AppProvider.useContext();

  return (
    <Container className="header-container">
      <div className="main-header">
        <SearchBar />
        <UserDetails username={userInfo?.userName} img={userInfo?.img} />
        <div className="user-info">
          <p>User Profile</p>
          <Navigate to="/profile" />
          <Link to="/profile">{userInfo?.userName}</Link>
        </div>
      </div>
    </Container>
  );
}

export default Header;
