import { Route, Routes, useNavigate} from 'react-router-dom';
import Main from '../Main/Main'
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import moviesData from '../../utils/movies';
import { useState, useEffect } from 'react';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';



function App() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isNavBarOpened, setisNavBarOpened] = useState(false);

  function onClickBar(isNavBarOpened) {
    setisNavBarOpened(!isNavBarOpened);
  };

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  useEffect(() => {
    setSavedMovies(moviesData.filter((movie) => {
      return movie.saved
    }))
  }, []);

  function goHome() {
    navigate("/", {replace: true});
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element ={<Main onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />}/>
        <Route path="/signup" element={<Register />}/>
        <Route path="/signin" element={<Login />} />
        <Route path="/movies" element={<Movies movies={movies} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />} />
        <Route path="/saved-movies" element={<SavedMovies movies={savedMovies} onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />} />
        <Route path="/profile" element ={<Profile onClickBar={onClickBar} isNavBarOpened={isNavBarOpened} />}/>
        <Route path="*" element={<NotFound goHome={goHome} />}  />
      </Routes>
    </div>
  );
}

export default App;
