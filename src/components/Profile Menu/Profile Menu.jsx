import "./Profile Menu.css";
import { useNavigate } from "react-router-dom";
const clearCookies = require("../../utils/clearCookies");
const keyboard = require("../../utils/keyboard");

export default function ProfileMenu() {
  const navigate = useNavigate();

  function logOut() {
    clearCookies.clearData().then(() => {
      navigate("/", { replace: true });
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }

  return (
    <div className="profile-menu-container flex-container-column">
      <div
        onClick={dashboard}
        onKeyDown={keyboard.click(dashboard)}
        role="button"
        tabIndex={0}
        className="profile-menu-item flex-container-row flex-item"
      >
        <img
          src="/images/dashboard.png"
          alt="Dashboard"
          className="profile-menu-image flex-item"
        />
        <section className="profile-menu-text flex-item">Dashboard</section>
      </div>
      <div
        onClick={logOut}
        onKeyDown={keyboard.click(logOut)}
        role="button"
        tabIndex={0}
        className="profile-menu-item flex-container-row flex-item"
      >
        <img
          src="/images/log-out.png"
          alt="Log Out"
          className="profile-menu-image flex-item"
        />
        <section className="profile-menu-text flex-item">Log Out</section>
      </div>
    </div>
  );
}
