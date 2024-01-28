import { Route, Routes, useNavigate} from 'react-router-dom';
import Main from '../Main/Main'
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import moviesList from '../../utils/movies';
import React from 'react';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';



function App() {
  const navigate = useNavigate();
  const [cardsMovies, setcardsMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isNavBarOpened, setisNavBarOpened] = React.useState(false);

  function onClickBar(isNavBarOpened) {
    setisNavBarOpened(!isNavBarOpened);
  };

  React.useEffect(() => {
    setcardsMovies(moviesList);
  }, []);

  React.useEffect(() => {
    setSavedMovies(moviesList.filter((cardMovie) => {
      return cardMovie.saved
    }))
  }, []);

  function goHome() {
    navigate("/", {replace: true});
  };

  return (
    <div className={`app app__${isNavBarOpened ? 'noScroll' : ''}`}>
      <Routes>
        <Route path="/" element ={<Main onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />}/>
        <Route path="/signup" element={<Register />}/>
        <Route path="/signin" element={<Login />} />
        <Route path="/movies" element={<Movies movies={cardsMovies} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />} />
        <Route path="/saved-movies" element={<SavedMovies movies={savedMovies} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />} />
        <Route path="/profile" element ={<Profile onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />}/>
        <Route path="*" element={<NotFound goHome={goHome} />}  />
      </Routes>
    </div>
  );
}

export default App;
