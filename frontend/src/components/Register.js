import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });

  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }
    onRegister(userData.email, userData.password);
    setUserData({ email: '', password: '' });
  }

  return (
    <>
      <h1 className="register__title">Регистрация</h1>
      <form
        className="register__inputs" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          className="register__input"
          placeholder="Email"
          required
          minLength="5" _
          maxLength="40"
          value={userData.email}
          onChange={handleChange}
        />
        <span className="popup__error input-name-error"></span>
        <input
          type="password"
          id="password"
          name="password"
          className="register__input"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="20"
          value={userData.password}
          onChange={handleChange}
        />
        <span className="popup__error input-status-error"></span>

        <button type="submit" className="register__button popup__button popup_button_theme_dark">Зарегистрироваться</button>
        <p className="register__link-login">
          Уже зарегистрированы?
          <NavLink to="/sign-in" className="register__button-login">Войти</NavLink>
        </p>
      </form>
    </>
  )
}
export default Register;
