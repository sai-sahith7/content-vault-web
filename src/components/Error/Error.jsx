import { NavLink } from "react-router-dom";
import "./Error.css";

export default function Error(props) {
  return (
    <div className="error-page flex-container-column">
      <div className="error-container flex-container-column flex-item">
        <img
          onClick={props.closeError}
          className="error-image flex-item"
          src="/images/cross-white.png"
          alt="error"
        />
        <h1 className="error-title flex-item">Error</h1>
        <p className="error-message flex-item">
          Sorry, something went wrong. Please try again.
        </p>
        <NavLink to="/" className="error-button flex-item">
          Go Back to Dashboard
        </NavLink>
      </div>
    </div>
  );
}
