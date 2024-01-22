import './Register.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Register() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }
    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // handleRegister(values);
    }

    return (
        <main className="register">
            <form className="register__form" name="register" noValidate onSubmit={handleSubmit}>
                <Link to="/" className="register__link">
                    <img src={logo} alt="Логотип" className="register__logo" />
                </Link>
                <h1 className="register__title">Добро пожаловать!</h1>
                <div className="register__labels-container">
                    <label className="register__label">
                        <span className="register__label-text">Имя</span>
                        <input name="name" className="register__input" onChange={handleNameChange} value={name || ''} type="text" required minLength="2" maxLength="30" />
                        <span className="register__error"></span>
                    </label>
                    <label className="register__label">
                        <span className="register__label-text">E-mail</span>
                        <input name="email" className="register__input register__input_type_email" onChange={handleEmailChange} value={email || ''} type="email" required />
                        <span className="register__error"></span>
                    </label>
                    <label className="register__label">
                        <span className="register__label-text">Пароль</span>
                        <input name="password" className="register__input" onChange={handlePasswordChange} value={password || ''} type="password" required />
                        <span className="register__error">Что-то пошло не так...</span>
                    </label>
                </div>
                <button type="submit" className="register__button register__button_disabled" disabled={true}>
                    Зарегистрироваться
                </button>
                <span className="register__support">
                    Уже зарегистрированы?&nbsp;
                    <Link to="/signin" className="register__link">
                        Войти
                    </Link>
                </span>
            </form>
        </main>
    )
}
