import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm() {
  return (
    <>
    <section className="search">
      <form className="search__form" name="search">
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          required
          autoComplete="off"
        />
        <button className="search__button" type="submit">Найти</button>
      </form>
      <span className="search__grey-line"></span>
      <FilterCheckbox />
    </section>
    <span className="search__bottom-line"></span>
    </>
  );
}

export default SearchForm;
