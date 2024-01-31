import './MoviesCardList.css';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import { getSavedMovieCard } from '../../utils/moviesFuncs.js';

function MoviesCardList({ movies, savedMovies, handleLikeMovie, handleDeleteMovie}) {
  const location = useLocation();
  const [displayList, setDisplayList] = useState([]);
  const [paramsOfList, setParamsOfList] = useState({all: movies.length, add: 4});
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
  }, [handleResizeWidth]);

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (screenWidth > 1200) {
        setParamsOfList({all: 16, add: 4});
      } else if (screenWidth <= 1200 && screenWidth > 1116) {
        setParamsOfList({all: 15, add: 3});
      } else if (screenWidth <= 1116 && screenWidth > 765) {
        setParamsOfList({all: 8, add: 2});
      } else {
        setParamsOfList({all: 5, add: 2});
      }
    }
  }, [screenWidth,  location.pathname, paramsOfList.add, paramsOfList.all]);

  useEffect(() => {
    if (movies.length) {
      const res = movies.filter((item, i) => i < paramsOfList.all);
      setDisplayList(res);
    }
  }, [movies, paramsOfList.all, paramsOfList.add]);


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
