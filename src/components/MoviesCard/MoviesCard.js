import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { fixDuration } from '../../utils/moviesFuncs';

function MoviesCard({ card, saved, handleLikeMovie, handleDeleteMovie}) {
  const location = useLocation();

  function handleLikeClick() {
    handleLikeMovie(card);
  }

  function handleDeleteClick() {
    handleDeleteMovie(card);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__item">
        <a href={card.trailerLink} className='movies-card__link' target='_blanc'>
        <img
          src={card.image}
          alt={card.title}
          className="movies-card__image"
        />
        </a>
        <div className="movies-card__description">
          <h2 className="movies-card__title">{card.nameRU}</h2>
          {location.pathname === '/movies' && (
            <button type="button" className={`movies-card__button movies-card__button_type_${!saved ? 'save' : 'saved'}`} onClick={!saved ? handleLikeClick : handleDeleteClick}></button>
          )}
          {location.pathname === "/saved-movies" && (
            <button type="button" className="movies-card__button movies-card__button_type_del" onClick={handleDeleteClick}></button>
          )}
        </div>
        <span className="movies-card__duration">{fixDuration(card.duration)}</span>
      </div>
    </li>
  )
}

export default MoviesCard;