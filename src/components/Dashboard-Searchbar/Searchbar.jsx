import "./Searchbar.css";

export default function Searchbar() {
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
      />
    </div>
  );
}
