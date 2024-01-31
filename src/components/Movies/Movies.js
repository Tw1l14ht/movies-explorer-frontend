import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { fixMovies, filterMovies, filterShortMovies, setNothingToSearch } from '../../utils/moviesFuncs.js';
import moviesApi from '../../utils/MoviesApi.js';
import NothingWasFound from '../NothigWasFound/NothigWasFound.js';

function Movies({ loggedIn, savedMovies, onClickBar, isNavBarOpened, handleLikeMovie,handleDeleteMovie, setIsLoad}) {

  const currentUser = useContext(CurrentUserContext);

  const [filter, setFilter] = useState(false);
  const [responseMovies, setResponseMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [NotFound, setNotFound] = useState(false);
  const [fullMoviesList, setfullMoviesList] = useState([]);
  const [errorText, setErrorText] = useState('')

  function handleSetFilteredMovies(movies, userRequest, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userRequest, shortMoviesCheckbox);
    setNothingToSearch(moviesList, setNotFound);
    setResponseMovies(moviesList);
    setFilteredMovies(shortMoviesCheckbox ? (filterShortMovies(moviesList, setNotFound)) : moviesList);
    localStorage.setItem(`movies ${currentUser.email}`, JSON.stringify(moviesList));
  }

  function handleSearchSubmit(userRequest) {
    localStorage.setItem(`userRequest ${currentUser.email}`, userRequest);
    localStorage.setItem(`filterCheckbox ${currentUser.email}`, filter);
    if (fullMoviesList.length === 0) {
      setIsLoad(true);
      moviesApi.getMovies()
        .then(movies => {
          setfullMoviesList(movies);
          handleSetFilteredMovies(fixMovies(movies), userRequest, filter);
        })
        .catch(() =>{
          console.log("Ошибка");
          setErrorText('Произошла ошибка. Подождите немного и попробуйте ещё раз');
        })
        .finally(() => setIsLoad(false));
    } else {
      handleSetFilteredMovies(fullMoviesList, userRequest, filter);
    }
  }

  function handleShortFilms() {
    setFilter(!filter);
    if (!filter) {
      setFilteredMovies(filterShortMovies(responseMovies, setNotFound));
    } else {
      setFilteredMovies(responseMovies);
      setNothingToSearch(responseMovies, setNotFound);
    }
    localStorage.setItem(`filterCheckbox ${currentUser.email}`, !filter);

  }

  useEffect(() => {
    if (localStorage.getItem(`filterCheckbox ${currentUser.email}`) === 'true') {
      setFilter(true);
    } else {
      setFilter(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`movies ${currentUser.email}`)) {
      const movies = JSON.parse(localStorage.getItem(`movies ${currentUser.email}`));
      setResponseMovies(movies);
      setNothingToSearch(movies, setNotFound);
      if ( localStorage.getItem(`filterCheckbox ${currentUser.email}`) === 'true') {
        setFilteredMovies(filterShortMovies(movies, setNotFound));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  return (
    <>
      <Header theme={true} login={loggedIn} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />
      <main className="movies">
        <SearchForm handleSearchSubmit={handleSearchSubmit} handleShortFilms={handleShortFilms} filter={filter} />
        {NotFound ? (<NothingWasFound text={errorText !== '' ? errorText : 'Фильмы не найдены'} />) : (<MoviesCardList handleDeleteMovie={handleDeleteMovie} movies={filteredMovies} savedMovies={savedMovies} handleLikeMovie={handleLikeMovie} />)}
      </main>
      <Footer />
    </>
  )
}

export default Movies;
