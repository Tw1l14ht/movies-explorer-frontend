import "./FilterCheckbox.css";

function FilterCheckbox({ filter, handleShortFilms }) {
  return (
    <label className="filter">
      <input className="filter__checkbox" type="checkbox" onChange={handleShortFilms} checked={filter ? true : false} />
      <span className="filter__tumbler"></span>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
