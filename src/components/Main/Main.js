import './Main.css';
import Promo from '../Promo/Promo.js'
import AboutProject from '../AboutProject/AboutProject.js';
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';
import Portfolio from '../Portfolio/Portfolio.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

export default function Main({ loggedIn, onClickBar, isNavBarOpened }) {
  return (
    <>
    {/* Чтобы увидеть NavBar для не авторизованных login={false} */}
    <Header theme={false} login={loggedIn} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
    <Footer />
    </>
  );
}
