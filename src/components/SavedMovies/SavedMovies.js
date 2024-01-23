import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

function SavedMovies({ movies, onClickBar, isNavBarOpened }) {
  return (
    <>
      <Header theme={true} login={true} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />
      <main className="saved-movies">
        <SearchForm />
        <MoviesCardList movies={movies} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;
