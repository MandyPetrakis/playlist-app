import { NavLink } from "react-router-dom";

export default function NavBar({ setShowLogIn }) {
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
        <NavLink to="/">Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/library">Your Library</NavLink>
        <NavLink to="/account">Account</NavLink>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
}
