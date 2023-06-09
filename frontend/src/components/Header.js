import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({ onLogout, loggedIn, userEmail }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {location.pathname === '/sign-in' && (
        <Link to="/sign-up" className='header__link'>Регистрация</Link>
      )}
      {location.pathname === '/sign-up' && (
        <Link to="/sign-in" className='header__link'>Войти</Link>
      )}
      {loggedIn && (
        <nav className="header__nav">
          <p className='header__email'>{userEmail}</p>
          <button onClick={onLogout} className="header__logout">Выйти</button>
        </nav>
      )}
    </header>
  );
}

export default Header;
