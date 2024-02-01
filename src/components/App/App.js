import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Main from '../Main/Main'
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import React from 'react';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isNavBarOpened, setisNavBarOpened] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [authError, setAuthError] = React.useState(false);
  const [regError, setRegError] = React.useState(false);
  const [editProfileError, setEditProfileError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoad, setIsLoad] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  function onClickBar(isNavBarOpened) {
    setisNavBarOpened(!isNavBarOpened);
  };

  function goHome() {
    navigate(-1);
  };

  function handleRegUser(name, email, password) {
    setIsDisabled(true);
    mainApi.createUser(name, email, password)
      .then((data) => {
        if (data) {
          handleAuthUser(email, password);
          setRegError(false);
          setAuthError(false);
        }
      })
      .catch((err) => {
        setRegError(true);
        setAuthError(false);
        console.log(err);
      })
      .finally(()=> setIsDisabled(false));
  }

  function handleAuthUser(email, password) {
    setIsDisabled(true);
    mainApi.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          navigate("/movies", { replace: true });
          setAuthError(false);
        }
      })
      .catch((err) => {
        setAuthError(true);
        setRegError(false);
        console.log(err);
      })
      .finally(()=> setIsDisabled(false));
  }

  function handleSingOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    localStorage.clear();
    navigate("/", { replace: true });
  }

  function handleUpdateUser({ name, email }) {
    mainApi
      .updateUser(name, email)
      .then((user) => {
        setCurrentUser(user);
        setEditProfileError(false);
      })
      .catch((err) => {
        setEditProfileError(true);
        setErrorMessage(err);
        console.log(err);
      });
  }

  function handleLikeMovie(movie) {
    mainApi
      .addNewMovie(movie)
      .then(newMovie => setSavedMovies([newMovie, ...savedMovies]))
      .catch(err =>
        console.log(err)
      );
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter(m => {
          if (movie.movieId === m.movieId || movie.id === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMovies(newMoviesList);
      })
      .catch(err =>
        console.log(err)
      );
  }

  React.useEffect(() => {
    mainApi
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  React.useEffect(() => {
    const pathName = location.pathname;
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            navigate(pathName, { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi
        .getSavedMovies()
        .then(data => {
          const moviesList = data.filter(m => m.owner === currentUser._id);
          setSavedMovies(moviesList);
        })
        .catch(err =>
          console.log(err)
        );
    }
  }, [currentUser, loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`app app__${isNavBarOpened ? 'noScroll' : ''}`}>
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />} />
          <Route path="/signup" element={loggedIn ? <Navigate to="/" replace /> : <Register isDisabled={isDisabled} authError={regError} handleRegUser={handleRegUser} />} />
          <Route path="/signin" element={loggedIn ? <Navigate to="/" replace /> : <Login isDisabled={isDisabled} authError={authError} handleAuthUser={handleAuthUser} />} />
          <Route path="/movies" element={<ProtectedRouteElement element={Movies}
            handleDeleteMovie={handleDeleteMovie}
            setIsLoad={setIsLoad}
            handleLikeMovie={handleLikeMovie}
            loggedIn={loggedIn}
            onClickBar={onClickBar}
            isNavBarOpened={isNavBarOpened}
            savedMovies={savedMovies} />}
          />
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies}
            handleDeleteMovie={handleDeleteMovie}
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            onClickBar={onClickBar}
            isNavBarOpened={isNavBarOpened} />} />

          <Route path="/profile" element={<ProtectedRouteElement element={Profile}
            errorMessage={errorMessage}
            editProfileError={editProfileError}
            loggedIn={loggedIn} handleUpdateUser={handleUpdateUser}
            handleSingOut={handleSingOut} onClickBar={onClickBar}
            isNavBarOpened={isNavBarOpened} />} />
          <Route path="*" element={<NotFound goHome={goHome} />} />
        </Routes>
        <Preloader load={isLoad} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
