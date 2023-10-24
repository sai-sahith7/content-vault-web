import "./Profile Menu.css";
const clearCookies = require("../../utils/clearCookies");

export default function ProfileMenu() {
  function logOut() {
    clearCookies.clearData().then(() => {
      window.open("/", "_self");
    });
  }

  function dashboard() {
    window.open("/dashboard", "_self");
  }

  return (
    <div className="profile-menu-container flex-container-column">
      <div
        onClick={dashboard}
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
