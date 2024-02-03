import './SavedMovies.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import { filterMovies, filterShortMovies, setNothingToSearch } from '../../utils/moviesFuncs.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import NothingWasFound from '../NothigWasFound/NothigWasFound.js';

function SavedMovies({ loggedIn, onClickBar, isNavBarOpened, savedMovies, handleDeleteMovie }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [filter, setFilter] = React.useState(false);
  const [displayMovies, setDisplayMovies] = React.useState(savedMovies); 
  const [filteredList, setfilteredList] = React.useState(displayMovies); 
  const [NotFound, setNotFound] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);

  function handleShortFilms() {
    if (!filter) {
      setFilter(true);
      localStorage.setItem(`filterCheckboxSaved ${currentUser.email}`, true);
      setDisplayMovies(filterShortMovies(filteredList, setNotFound));
      filterShortMovies(filteredList, setNotFound);
    } else {
      setFilter(false);
      localStorage.setItem(`filterCheckboxSaved ${currentUser.email}`, false);
      setNothingToSearch(filteredList, setNotFound);
      setDisplayMovies(filteredList);
    }
  }

  function handleSearchSubmit(userRequest) {
    setIsDelete(false);
    const moviesList = filterMovies(savedMovies, userRequest, filter, setNotFound);
    setNothingToSearch(moviesList, setNotFound)
    setfilteredList(moviesList);
    setDisplayMovies(moviesList);
  }

  React.useEffect(() => {
    setIsDelete(true);
    setDisplayMovies(savedMovies);
    console.log(isDelete);
  }, [savedMovies]);


  React.useEffect(() => {
    setFilter(false);
    setfilteredList(savedMovies);
    setDisplayMovies(savedMovies);
    setNothingToSearch(savedMovies, setNotFound);
  }, [savedMovies]);
  return (
    <>
      <Header theme={true} login={loggedIn} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />
      <main className="saved-movies">
        <SearchForm handleSearchSubmit={handleSearchSubmit} handleShortFilms={handleShortFilms} filter={filter} isDelete={isDelete} />
        {NotFound ? (<NothingWasFound text={'Фильмы не найдены'}/>) : (<MoviesCardList handleDeleteMovie={handleDeleteMovie} movies={displayMovies} savedMovies={savedMovies} />)}
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;
