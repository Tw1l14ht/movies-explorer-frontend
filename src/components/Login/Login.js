import './Login.css';
import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
      }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
      }
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="login">
      <form className="login__form" name="login" noValidate onSubmit={handleSubmit}>
        <Link to="/" className="login__link">
          <img src={logo} alt="Логотип" className="login__logo" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <div className="login__inputs-container">
          <label className="login__label">
            <span className="login__label-text">E-mail</span>
            <input name="email" className='login__input' onChange={handleEmailChange} value={email || ''} type="email" required />
            <span className="login__error"></span>
          </label>
          <label className="login__label">
            <span className="login__label-text">Пароль</span>
            <input name="password" className="login__input" onChange={handlePasswordChange} value={password || ''}  type="password" required />
            <span className="login__error"></span>
          </label>
        </div>
        <button type="submit" className="login__button">
          Войти
        </button>
        <span className="login__support">
          Ещё не зарегистрированы?&nbsp;
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </span>
      </form>
    </main>
  )
}
