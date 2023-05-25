import React, { useCallback, useState } from 'react';

const Login = ({ onLogin }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(userData);
  }

  return (
    <>
      <h1 className="register__title">Вход</h1>
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
          value={userData.email || ''}
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
          value={userData.password || ''}
          onChange={handleChange} />
        <span className="popup__error input-status-error"></span>

        <button type="submit" className="popup__button popup_button_theme_dark">Войти</button>
      </form>
    </>
  )
}
export default Login;
