import { DURATION } from './constants.js';

function filterMovies(movies, userRequest, shortMoviesCheckbox, setNotFound) {
  const responseMovies = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = userRequest.toLowerCase().trim();
    return ~movieRu.indexOf(userMovie) || ~movieEn.indexOf(userMovie);
  });

  if (shortMoviesCheckbox) {
    return filterShortMovies(responseMovies, setNotFound);
  } else {
    return responseMovies;
  }
}

function fixDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if(hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

function fixMovies(movies) {
  movies.forEach(movie => {
    movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
    movie.image = `https://api.nomoreparties.co${movie.image.url}`
  });
  return movies
}

function filterShortMovies(movies, setNotFound) {
  const shortMovies = movies.filter(movie => movie.duration < DURATION);
  if (shortMovies.length === 0){
    setNotFound(true);
  }
  else{
    setNotFound(false);
  }
  return shortMovies;
}

function setNothingToSearch(movies, setNotFound) {
  if (movies.length === 0) {
    setNotFound(true);
  } else {
    setNotFound(false);
  }
}

function getSavedMovieCard(arr, movie) {
  return arr.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  });
}

export {
  fixMovies,
  filterMovies,
  filterShortMovies,
  fixDuration,
  getSavedMovieCard,
  setNothingToSearch,
};
