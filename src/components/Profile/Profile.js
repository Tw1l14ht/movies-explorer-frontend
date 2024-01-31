import './Profile.css';
import React from "react";
import Header from '../Header/Header.js';
import useForm from '../../hooks/useForm.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import NothingWasFound from '../NothigWasFound/NothigWasFound.js';

function Profile({ loggedIn, handleUpdateUser, handleSingOut, onClickBar, isNavBarOpened, errorMessage, editProfileError }) {
  const { values, handleChange, resetForm, errors, isValid } = useForm();
  const currentUser = React.useContext(CurrentUserContext);
  const isDisable = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser(values);
  }

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  return (
    <>
      <Header theme={true} login={loggedIn} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />
      <main className="profile">
        <form className="profile__form" name="profile" noValidate onSubmit={handleSubmit}>
          <h1 className="profile__title">Привет, {values.name}!</h1>
          <div className="profile__inputs-content">
            <label className="profile__label">
              <span className="profile__label-text">Имя</span>
              <input name="name" className="profile__input profile__input_type_name" onChange={handleChange} value={values.name || ''} type="text" required minLength="2" maxLength="30" />
              <span className="profile__error-name">{errors.name || ''}</span>
            </label>
            <label className="profile__label">
              <span className="profile__label-text">E-mail</span>
              <input name="email" className="profile__input profile__input_type_email" onChange={handleChange} value={values.email || ''} type="email" required />
              <span className="profile__error">{errors.email || ''}</span>
            </label>
          </div>
          <div className="profile__button-container">
          {editProfileError && <NothingWasFound text={errorMessage}/>}
            <button type="submit" className={`profile__button-edit ${isDisable ? 'profile__button-edit_disabled' : ''}`} disabled={isDisable}>
              Редактировать
            </button>
            <button type="submit" className="profile__button-exit" onClick={handleSingOut}>
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

export default Profile;
