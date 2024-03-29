import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__projects-list">
          <li className="portfolio__projects-items">
            <a href="https://github.com/Tw1l14ht/how-to-learn" target="_blank" rel="noreferrer" className="portfolio__link" >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__projects-items">
            <a href="https://github.com/Tw1l14ht/russian-travel" target="_blank" rel="noreferrer" className="portfolio__link" >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__projects-items">
            <a href="https://github.com/Tw1l14ht/react-mesto-api-full-gha" target="_blank" rel="noreferrer" className="portfolio__link" >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
