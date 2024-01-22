import './Navigation.css';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ authorized, isNavBarOpened, onClickBar }) {

  const handleOnClickBar = () => {
    onClickBar(isNavBarOpened);
  }

  const handleResize = () => {
    if (window.innerWidth > 800) {
      onClickBar(true)
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  const activeNav = `navigation__link_active_${isNavBarOpened ? 'mobile' : 'desktop'}`;
  return (
    <>
      {authorized ? (
        <nav className={`navigation navigation_logged  navigation_state_${isNavBarOpened ? 'opened' : 'closed'}`}>
          <button type="button" className={`navigation__hamburger-button navigation__hamburger-button_${isNavBarOpened ? "active" : ""}`} onClick={handleOnClickBar}>
            <span></span>
          </button>
          <ul className={`navigation__list navigation__list_logged navigation__list_state_${isNavBarOpened ? 'opened' : 'closed'}`}>
            {isNavBarOpened && (
              <li className="navigation__item">
                <NavLink to="/" className={({ isActive }) => `navigation__link ${isActive ? activeNav : ""}`}>
                  Главная
                </NavLink>
              </li>
            )}
            <li className="navigation__item navigation__item_movies">
              <NavLink to="/movies" className={({ isActive }) => `navigation__link ${isActive ? activeNav : ""}`}>
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item navigation__item_sm">
              <NavLink to="/saved-movies" className={({ isActive }) => `navigation__link ${isActive ? activeNav : ""}`}>
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className="navigation__item navigation__item_acc">
              <NavLink to="/profile" className={({ isActive }) => `navigation__link navigation__link_type_account ${isActive ? "navigation__acc-link_active" : ""}`}>
                Аккаунт
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navigation">
          <ul className="navigation__list">
            <li>
              <Link to="/signup" className="navigation__link navigation__link_about-proj">
                Регистрация
              </Link>
            </li>
            <li>
              <Link to="/signin" className="navigation__link navigation__link_about-proj navigation__link_signin">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navigation;
