import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation.js';
import logo from '../../images/logo.svg';

function Header({ theme, login, onClickBar, isNavBarOpened }) {
  return (
    <header className={`header header_theme_${theme ? 'dark' : 'bright'}`}>
      <div className="header__container">
        <Link to="/" className="header__link">
          <img src={logo} alt="Логотип" />
        </Link>
        <Navigation login={login} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />
      </div>
    </header>
  );
}

export default Header;
