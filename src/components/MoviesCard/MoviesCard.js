import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ card }) {
  const location = useLocation();

  const [isCardSaved, setIsCardSaved] = useState(card.saved);

  const handleOnClick = () => {
    setIsCardSaved(!isCardSaved);
  };

  return (
    <li className="movies-card">
      <div className="movies-card__item">
        <img
          src={card.image}
          alt={card.title}
          className="movies-card__image"
        />
        <div className="movies-card__description">
          <h2 className="movies-card__title">{card.title}</h2>
          {location.pathname === '/movies' && (
            <button type="button" className={`movies-card__button movies-card__button_type_${!isCardSaved ? 'save' : 'saved'}`} onClick={handleOnClick}></button>
          )}
          {location.pathname === "/saved-movies" && (
            <button type="button" className="movies-card__button movies-card__button_type_del"></button>
          )}
        </div>
        <span className="movies-card__duration">{card.duration}</span>
      </div>
    </li>
  )
}

export default MoviesCard;