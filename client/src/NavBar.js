import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar({ setShowLogIn }) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setShowLogIn(true);
      routeChange();
    });
  }

  const activeStyle =
    "text-emerald-400 underline underline-offset-4 decoration-4 cursor-default";

  const logo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-12 sm:w-20 text-emerald-400 md:mb-5 mr-5"
    >
      <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
    </svg>
  );

  return (
    <div className="md:grid md:w-72 p-10 flex justify-between">
      {logo}
      <div className="flex items-center md:items-start md:flex-col float-right md:float-left sm:text-xl font-light text-md">
        <div className="mr-5 md:mb-5">
          <NavLink
            className={(navData) => (navData.isActive ? activeStyle : null)}
            to="/"
          >
            Home
          </NavLink>
        </div>
        <div className="mr-5 md:mb-5">
          <NavLink
            className={(navData) => (navData.isActive ? activeStyle : null)}
            to="/library"
          >
            Your Library
          </NavLink>
        </div>
        <div className="mr-5 md:mb-5">
          <NavLink
            className={(navData) => (navData.isActive ? activeStyle : null)}
            to="/explore"
          >
            Explore
          </NavLink>
        </div>
        <div className="mr-5 md:mb-5">
          <NavLink
            className={(navData) => (navData.isActive ? activeStyle : null)}
            to="/account"
          >
            Account
          </NavLink>
        </div>
        <div
          className="cursor-pointer bg-emerald-400 px-3 py-1 rounded text-zinc-800 font-semibold whitespace-nowrap"
          onClick={handleLogOut}
        >
          Log Out
        </div>
      </div>
    </div>
  );
}
