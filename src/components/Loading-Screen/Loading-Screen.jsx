import "./Loading-Screen.css";

export default function LoadingScreen() {
  return (
    <div className="loadingScreen-page flex-container-column">
      <div className="loadingScreen-container flex-container-column flex-item">
        <img
          src="/images/spidey-loading.gif"
          alt="Loading..."
          className="loadingScreen-loading flex-item"
        />
        <p className="loadingScreen-text flex-item">Loading...</p>
      </div>
    </div>
  );
}
