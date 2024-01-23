import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__container">
        <h2 className="about-project__title">
          О проекте
        </h2>
        <ul className="about-project__content-list">
          <li className="about-project__content-item">
            <h3 className="about-project__content-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__content-description">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </li>

          <li className="about-project__content-item">
            <h3 className="about-project__content-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__content-description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-project__timetable">
          <div className="about-project__backend">
            <span className="about-project__backend-duration">1 неделя</span>
            <span className="about-project__timetable-title">Back-end</span>
          </div>
          <div className="about-project__frontend">
            <span className="about-project__frontend-duration">4 недели</span>
            <span className="about-project__timetable-title">Front-end</span>
          </div>
        </div>
      </div>
    </section>

  );
}
