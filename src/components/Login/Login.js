import './Login.css';
import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useForm from '../../hooks/useForm';
import NothingWasFound from '../NothigWasFound/NothigWasFound';

export default function Login({handleAuthUser, authError}) {
  const { values, handleChange, resetForm, errors, isValid } = useForm();


  function handleSubmit(e) {
      e.preventDefault();
      handleAuthUser(values.email, values.password);
  }

  React.useEffect(() => {
      resetForm();
    }, [resetForm]);


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
            <input name="email" className='login__input' onChange={handleChange} value={values.email || ''} type="email" required />
            <span className="login__error">{errors.email || ''}</span>
          </label>
          <label className="login__label">
            <span className="login__label-text">Пароль</span>
            <input name="password" className="login__input" onChange={handleChange} value={values.password || ''}  type="password" required minLength="2" maxLength="30" />
            <span className="login__error">{errors.password || ''}</span>
          </label>
        </div>
        {authError && <NothingWasFound text={'Что-то пошло не так, попробуйте еще раз'}/>}
        <button type="submit" className={`login__button ${!isValid && 'login__button_disabled'}`} disabled={!isValid} >
          Войти
        </button>
        <span className="login__support">
          Ещё не зарегистрированы?&nbsp;
          <Link to="/signup" className="login__link"> Регистрация </Link>
        </span>
      </form>
    </main>
  )
}
