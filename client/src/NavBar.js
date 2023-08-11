import { NavLink } from "react-router-dom";

export default function NavBar({ setShowLogIn }) {
  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    }).then(setShowLogIn(true));
  }

  return (
    <div className="nav-bar mb-20">
      <div className="hamburger mr-5 float-left">
        <span className="h-1 w-10 mb-2 block bg-white"></span>
        <span className="h-1 w-10 mb-2 block bg-white"></span>
        <span className="h-1 w-10 mb-2 block bg-white"></span>
      </div>
      <span className="menu">MENU</span>
      <div className="flex md:flex-col float-right md:float-left">
        <div className="mr-5">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="mr-5">
          <NavLink to="/explore">Explore</NavLink>
        </div>
        <div className="mr-5">
          <NavLink to="/library">Your Library</NavLink>
        </div>
        <div className="mr-5">
          <NavLink to="/account">Account</NavLink>
        </div>
        <div className="mr-5" onClick={handleLogOut}>
          Log Out
        </div>
      </div>
    </div>
  );
}
