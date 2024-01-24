import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm() {
  return (
    <div className="search">
      <section className="search search-content">
        <form className="search-content__form" name="search-content">
          <input
            className="search-content__input"
            name="search"
            type="text"
            placeholder="Фильм"
            required
            autoComplete="off"
          />
          <button className="search-content__button" type="submit">Найти</button>
        </form>
        <span className="search-content__grey-line"></span>
        <FilterCheckbox />
      </section>
      <span className="search__bottom-line"></span>
    </div>
  );
}

export default SearchForm;
