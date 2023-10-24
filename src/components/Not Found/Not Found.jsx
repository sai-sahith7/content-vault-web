import "./Not Found.css";

export default function NotFound() {
  return (
    <div className="notFound-page flex-container-column">
      <div className="notFound-container flex-container-column flex-item">
        <img
          src="/images/page-not-found.gif"
          alt="Loading..."
          className="notFound-loading flex-item"
        />
        <p className="notFound-text flex-item">Page not Found 🫠</p>
      </div>
    </div>
  );
}
