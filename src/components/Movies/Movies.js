import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

function Movies({ movies, onClickBar, isNavBarOpened }) {
  return (
    <>
      <Header theme={true} login={true} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList movies={movies} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;
