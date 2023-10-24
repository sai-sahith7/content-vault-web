import "./Navbar.css";
import { useState } from "react";
import ProfileMenu from "../Profile Menu/Profile Menu";

export default function Navbar(props) {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu(event) {
    setShowMenu(!showMenu);
    document.addEventListener("click", (e) => {
      if (e.target !== event.target) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    });
  }

  return (
    <div className="navbar-container flex-container-row">
      {showMenu ? <ProfileMenu /> : null}
      <section className="navbar-logo-text flex-item">CV</section>
      <div className="navbar-profile-container flex-item flex-container-row">
        <section className="navbar-profile-username flex-item">
          {props.user.name}
        </section>
        <img
          onClick={toggleMenu}
          className="navbar-profile-image flex-item"
          src={props.user.avatar}
          alt="Profile"
        />
      </div>
    </div>
  );
}
