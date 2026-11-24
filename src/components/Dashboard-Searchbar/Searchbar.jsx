import "./Searchbar.css";

export default function Searchbar(props) {
  function handleSearchOnChange(event) {
    props.setSearch(event.target.value);
  }

  return (
    <div className="dashboard-searchbar-container flex-container-row">
      <img
        className="dashboard-searchbar-icon flex-item"
        src="/images/search-button.png"
        alt="Search"
      />
      <input
        className="dashboard-searchbar-input flex-item"
        type="text"
        placeholder="Search..."
        aria-label="Search collections"
        value={props.search}
        onChange={handleSearchOnChange}
      />
    </div>
  );
}
