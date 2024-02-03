import "./SearchForm.css";
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import useForm from "../../hooks/useForm.js";

function SearchForm({ handleSearchSubmit, handleShortFilms, filter, isDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const { values, handleChange, isValid, setIsValid } = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      handleSearchSubmit(values.search);
    } else {
      setErrorMessage('Нужно ввести ключевое слово.');
    }
  };

  useEffect(() => {
    if(location.pathname === '/saved-movies'){
      values.search = '';
    }
  }, [isDelete]);

  useEffect(() => {
    setErrorMessage('')
  }, [isValid]);

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem(`userRequest ${currentUser.email}`)) {
      const searchValue = localStorage.getItem(`userRequest ${currentUser.email}`);
      values.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser]);
  return (
    <div className="search">
      <section className="search search__content">
        <form className="search__form" name="search" onSubmit={handleSubmit} noValidate>
          <input
            noValidate
            className="search__input"
            name="search"
            type="text"
            placeholder="Фильм"
            required
            autoComplete="off"
            onChange={handleChange}
            value={values.search || ''}
          />
          <span className="search__input-error">{errorMessage}</span>
          <button className="search__button" type="submit">Найти</button>
        </form>
        <span className="search__grey-line"></span>
        <FilterCheckbox filter={filter} handleShortFilms={handleShortFilms} />
      </section>
      <span className="search__bottom-line"></span>
    </div>
  );
}

export default SearchForm;
