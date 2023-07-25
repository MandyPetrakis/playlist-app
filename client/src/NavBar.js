import { NavLink } from "react-router-dom";

export default function NavBar({ setShowLogIn }) {
  const linkStyles = {
    display: "flex",
    margin: "10px",
    borderStyle: "none",
  };

  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    }).then(setShowLogIn(true));
  }

  return (
    <div className="nav-bar">
      <div className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="menu">MENU</span>
      <div>
        <NavLink to="/" style={{ linkStyles }}>
          Home
        </NavLink>
        <NavLink to="/account" style={{ linkStyles }}>
          Account
        </NavLink>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
}
