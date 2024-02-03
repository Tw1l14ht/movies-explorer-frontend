import './Register.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useForm from '../../hooks/useForm';
import NothingWasFound from '../NothigWasFound/NothigWasFound';

export default function Register({handleRegUser, authError, isDisabled}) {
    const { values, handleChange, resetForm, errors, isValid } = useForm();


    function handleSubmit(e) {
        e.preventDefault();
        handleRegUser(values.name, values.email, values.password);
    }

    React.useEffect(() => {
        resetForm();
      }, [resetForm]);

    return (
        <main className="register">
            <form className="register__form" name="register" noValidate onSubmit={handleSubmit}>
                <Link to="/" className="register__link">
                    <img src={logo} alt="Логотип" className="register__logo" />
                </Link>
                <h1 className="register__title">Добро пожаловать!</h1>
                <div className="register__inputs-container">
                    <label className="register__label">
                        <span className="register__label-text">Имя</span>
                        <input name="name" className="register__input" onChange={handleChange} value={values.name || ''}  disabled={isDisabled} type="text" required minLength="2" maxLength="30" />
                        <span className="register__error">{errors.name || ''}</span>
                    </label>
                    <label className="register__label">
                        <span className="register__label-text">E-mail</span>
                        <input name="email" className="register__input  register__input_type_email" disabled={isDisabled} onChange={handleChange} value={values.email || ''} type="email" required />
                        <span className="register__error">{errors.email || ''}</span>
                    </label>
                    <label className="register__label">
                        <span className="register__label-text">Пароль</span>
                        <input name="password" className="register__input" onChange={handleChange} value={values.password || ''} disabled={isDisabled} type="password" required minLength="2" maxLength="30"/>
                        <span className="register__error">{errors.password || ''}</span>
                    </label>
                </div>
                {authError && <NothingWasFound text={'Что-то пошло не так, попробуйте еще раз'}/>}
                <button type="submit" className={`register__button ${!isValid && 'register__button_disabled'}` } disabled={!isValid || isDisabled}>
                    Зарегистрироваться
                </button>
                <span className="register__support">
                    Уже зарегистрированы?&nbsp;
                    <Link to="/signin" className="register__link">Войти</Link>
                </span>
            </form>
        </main>
    )
}
