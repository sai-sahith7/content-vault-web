import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Error.css";
const keyboard = require("../../utils/keyboard");

export default function Error(props) {
  const cookies = new Cookies();
  const signedIn = Boolean(cookies.get("token"));

  return (
    <div className="error-page flex-container-column">
      <div className="error-container flex-container-column flex-item">
        <img
          onClick={props.closeError}
          onKeyDown={keyboard.click(props.closeError)}
          role="button"
          tabIndex={0}
          className="error-image flex-item"
          src="/images/cross-white.png"
          alt="Close"
        />
        <h1 className="error-title flex-item">Error</h1>
        <p className="error-message flex-item">
          Sorry, something went wrong. Please try again.
        </p>
        <NavLink
          to={signedIn ? "/dashboard" : "/"}
          reloadDocument
          className="error-button flex-item"
        >
          {signedIn ? "Go Back to Dashboard" : "Go Back Home"}
        </NavLink>
      </div>
    </div>
  );
}
