import "./Not Found.css";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not Found | Content Vault";
  }, []);

  return (
    <div className="notFound-page flex-container-column">
      <div className="notFound-container flex-container-column flex-item">
        <img
          src="/images/page-not-found.gif"
          alt="Page not Found"
          className="notFound-loading flex-item"
        />
        <p className="notFound-text flex-item">Page not Found 🫠</p>
      </div>
    </div>
  );
}
