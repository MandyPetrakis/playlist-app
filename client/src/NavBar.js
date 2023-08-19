import { NavLink } from "react-router-dom";

export default function NavBar({ setShowLogIn }) {
  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    }).then(setShowLogIn(true));
  }

  return (
    <div className="mb-10 py-5 px-2 text-white rounded md:grid">
      <div className="hamburger mr-5 float-left md:mb-10">
        <span className="h-1 w-10 mb-2 block bg-emerald-400 rounded"></span>
        <span className="h-1 w-10 mb-2 block bg-emerald-400 rounded"></span>
        <span className="h-1 w-10 mb-2 block bg-emerald-400 rounded"></span>
      </div>

      <div className="flex p-2 md:flex-col float-right md:float-left">
        <div className="mr-5 md:mb-2">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="mr-5 md:mb-2">
          <NavLink to="/library">Your Library</NavLink>
        </div>
        <div className="mr-5 md:mb-2">
          <NavLink to="/explore">Explore</NavLink>
        </div>
        <div className="mr-5 md:mb-2">
          <NavLink to="/account">Account</NavLink>
        </div>
        <div className="cursor-pointer md:mb-2" onClick={handleLogOut}>
          Log Out
        </div>
      </div>
    </div>
  );
}
