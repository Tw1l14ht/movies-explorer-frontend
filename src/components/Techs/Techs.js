import "./Techs.css";

export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__amount">7 технологий</h3>
        <p className="techs__about">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__content">
          <li className="techs__content-item">
            <p className="techs__content-name">HTML</p>
          </li>
          <li className="techs__content-item">
            <p className="techs__content-name">CSS</p>
          </li>
          <li className="techs__content-item">
            <p className="techs__content-name">JS</p>
          </li>
          <li className="techs__content-item">
            <p className="techs__content-name">React</p>
          </li>
          <li className="techs__content-item">
            <p className="techs__content-name">Git</p>
          </li>
          <li className="techs__content-item">
            <p className="techs__content-name">Express.js</p>
          </li>
          <li className="techs__content-item">
            <p className="techs__content-name">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
