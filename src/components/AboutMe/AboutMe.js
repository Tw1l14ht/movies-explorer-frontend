import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

export default function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__bio-container">
          <div className="about-me__bio">
            <h3 className="about-me__name">Иван</h3>
            <p className="about-me__age">Фронтенд-разработчик, 20 лет</p>
            <p className="about-me__text">
            Я родился в Кореновске, сейчас живу в Краснодаре, учусь на физико - техническом факультете.
            Я люблю слушать музыку, а ещё увлекаюсь спотом. Недавно начал кодить.
            Пробовал разные языки программирования, но решил связать свою работу с Web-разработкой.
            По завершении универа планирую найти работу Frontend разработчиком, а пока буду подрабатывать на фрилансе. 
            </p>
            <ul className="about-me__socials">
              <li>
                <a
                  href="https://github.com/Tw1l14ht"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-me__avatar"
            src={avatar}
            alt="фотография разработчика"
          />
        </div>
      </div>
    </section>
  );
}
