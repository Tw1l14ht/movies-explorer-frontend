import './Profile.css';
import React from "react";
import Header from '../Header/Header.js';

function Profile({ onClickBar, isNavBarOpened }) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Header themeDark={true} authorized={true} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />
      <main className="profile">
        <form className="profile__form" name="profile" noValidate onSubmit={handleSubmit}>
          <h1 className="profile__title">Привет, Tw1l14ht!</h1>
          <div className="profile__labels-container">
            <label className="profile__label">
              <span className="profile__label-text">Имя</span>
              <input name="name" className="profile__input profile__input_type_name" onChange={handleNameChange} value={name || 'Tw1l14ht'} type="text" required minLength="2" maxLength="30" />
              <span className="profile__error-name"></span>
            </label>
            <label className="profile__label">
              <span className="profile__label-text">E-mail</span>
              <input name="email" className="profile__input profile__input_type_email" onChange={handleEmailChange} value={email || 'tw1l14ht@gmail.com'} type="email" required />
              <span className="profile__error"></span>
            </label>
          </div>
          <div className="profile__button-container">
            <button type="submit" className="profile__button-edit profile__button-edit_disabled" disabled={true}>
              Редактировать
            </button>
            <button type="submit" className="profile__button-exit">
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

export default Profile;
