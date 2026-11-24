import "./Navbar.css";
import { NavLink } from "react-router-dom";
import ProfileMenu from "../Profile Menu/Profile Menu";
import useMenu from "../../utils/useMenu";
const signIn = require("../../utils/signIn");
const keyboard = require("../../utils/keyboard");

export default function Navbar(props) {
  const { showMenu, toggleMenu, menuButton } = useMenu();

  function signInWithGoogle() {
    signIn.signInWithGoogle(window.location.pathname);
  }

  return (
    <div className="navbar-container flex-container-row">
      {showMenu ? <ProfileMenu /> : null}
      <NavLink
        to={props.user ? "/dashboard" : "/"}
        className="navbar-logo-text flex-item"
      >
        CV
      </NavLink>
      {props.user ? (
        <div className="navbar-profile-container flex-item flex-container-row">
          <section className="navbar-profile-username flex-item">
            {props.user.name}
          </section>
          <img
            ref={menuButton}
            onClick={toggleMenu}
            onKeyDown={keyboard.click(toggleMenu)}
            role="button"
            tabIndex={0}
            className="navbar-profile-image flex-item"
            src={props.user.avatar}
            alt="Profile"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <img
          onClick={signInWithGoogle}
          onKeyDown={keyboard.click(signInWithGoogle)}
          role="button"
          tabIndex={0}
          className="navbar-signin-image flex-item"
          src="/images/Sign-in-with-Google.png"
          alt="Sign in with Google"
        />
      )}
    </div>
  );
}
