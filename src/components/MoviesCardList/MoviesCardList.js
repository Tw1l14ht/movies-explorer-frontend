import './MoviesCardList.css';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import { getSavedMovieCard } from '../../utils/moviesFuncs.js';
import { paramsOfMoviesList } from '../../utils/constants.js';

function MoviesCardList({ movies, savedMovies, handleLikeMovie, handleDeleteMovie}) {
  const location = useLocation();
  const [isMount, setIsMount] = useState(true);
  const {fourCard, threeCard, twoCard, oneCard} = paramsOfMoviesList;
  const [displayList, setDisplayList] = useState([]);
  const [paramsOfList, setParamsOfList] = useState({all: savedMovies.length, add: 4});
  const [screenWidth, setScreenWidth] = useState(
    document.documentElement.clientWidth
  );
  
  const handleResizeWidth = useCallback(() => {
    setScreenWidth(document.documentElement.clientWidth);
  }, [setScreenWidth]);

  useEffect(() => {
    let timer

    window.addEventListener('resize', resize);

    function resize() {
      if (!timer) {
        timer = null;
        timer = setTimeout(() => {
          handleResizeWidth();
        }, 1000);
      }
    }
    return () => window.removeEventListener('resize', resize);
  }, [handleResizeWidth,screenWidth]);

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (screenWidth > fourCard.width) {
        setParamsOfList(fourCard.params);
      } else if (screenWidth <= fourCard.width && screenWidth > threeCard.width) {
        setParamsOfList(threeCard.params);
      } else if (screenWidth <= threeCard.width && screenWidth > twoCard.width) {
        setParamsOfList(twoCard.params);
      } else {
        setParamsOfList(oneCard.params);
      }
      return () => setIsMount(false);
    }
  }, [screenWidth, isMount, location.pathname, fourCard, threeCard, twoCard, oneCard]);

  useEffect(() => {
    if (movies.length) {
      const res = movies.filter((item, i) => i < paramsOfList.all);
      setDisplayList(res);
    }
  }, [movies, paramsOfList.all]);


  function handleClickMoreMovies() {
    const arrLenght = displayList.length
    const newCards = movies.slice(arrLenght, arrLenght + paramsOfList.add);
    setDisplayList([...displayList, ...newCards]);

  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {displayList.map(cardMovie => (
          <MoviesCard
            key={cardMovie.id || cardMovie._id}
            saved={getSavedMovieCard(savedMovies, cardMovie)}
            card={cardMovie}
            handleLikeMovie={handleLikeMovie}
            handleDeleteMovie={handleDeleteMovie}
          />
        ))}
      </ul>
      {location.pathname === '/movies' && displayList.length >= 5 && displayList.length < movies.length && (
        <button className="movies-card-list__more-btn" onClick={handleClickMoreMovies}>Ещё</button>
      )}
    </section>
  )
}

export default MoviesCardList;
