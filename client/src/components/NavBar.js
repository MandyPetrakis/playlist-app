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
    "text-emerald-400 underline underline-offset-2 decoration-2 cursor-default";

  const inactiveStyle = "relative group-hover:bottom-1";

  const logo = (
    <svg
      fill="#34d399"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 47 47"
      className="w-16 h-16 sm:w-28 sm:h-28 md:mb-10 mr-5"
    >
      <g>
        <g>
          <g>
            <path
              d="M2.41,31.936c-1.331,0-2.41-1.078-2.41-2.41v-12.05c0-1.331,1.079-2.41,2.41-2.41s2.41,1.079,2.41,2.41v12.05
				C4.82,30.855,3.741,31.936,2.41,31.936z"
            />
          </g>
          <g>
            <path
              d="M9.44,37.962c-1.331,0-2.41-1.079-2.41-2.41V11.448c0-1.331,1.079-2.41,2.41-2.41s2.41,1.079,2.41,2.41v24.104
				C11.851,36.883,10.771,37.962,9.44,37.962z"
            />
          </g>
          <g>
            <path
              d="M16.47,34.948c-1.331,0-2.41-1.079-2.41-2.41V14.462c0-1.331,1.079-2.41,2.41-2.41c1.331,0,2.411,1.079,2.411,2.41
				v18.076C18.88,33.869,17.801,34.948,16.47,34.948z"
            />
          </g>
          <g>
            <path
              d="M23.5,40.975c-1.331,0-2.41-1.078-2.41-2.41V8.436c0-1.331,1.079-2.41,2.41-2.41s2.41,1.079,2.41,2.41v30.128
				C25.91,39.896,24.831,40.975,23.5,40.975z"
            />
          </g>
          <g>
            <path
              d="M30.529,47c-1.33,0-2.41-1.079-2.41-2.41V2.41c0-1.331,1.08-2.41,2.41-2.41c1.332,0,2.41,1.079,2.41,2.41v42.18
				C32.939,45.921,31.861,47,30.529,47z"
            />
          </g>
          <g>
            <path
              d="M37.561,37.962c-1.332,0-2.41-1.079-2.41-2.41V11.448c0-1.331,1.078-2.41,2.41-2.41c1.33,0,2.41,1.079,2.41,2.41v24.104
				C39.971,36.883,38.891,37.962,37.561,37.962z"
            />
          </g>
          <g>
            <path
              d="M44.59,28.923c-1.331,0-2.41-1.079-2.41-2.409v-6.026c0-1.331,1.079-2.41,2.41-2.41S47,19.157,47,20.488v6.026
				C47,27.844,45.921,28.923,44.59,28.923z"
            />
          </g>
        </g>
      </g>
    </svg>
  );

  return (
    <div className="md:grid md:w-72 p-10 flex justify-between place-items-center md:fixed">
      {logo}
      <div className="flex items-center md:items-start md:flex-col float-right md:float-left sm:text-xl font-light text-md">
        <div className="mr-5 md:mb-5 group">
          <NavLink
            className={(navData) =>
              navData.isActive ? activeStyle : inactiveStyle
            }
            to="/"
          >
            Home
          </NavLink>
        </div>
        <div className="mr-5 md:mb-5 whitespace-nowrap group">
          <NavLink
            className={(navData) =>
              navData.isActive ? activeStyle : inactiveStyle
            }
            to="/library"
          >
            Your Library
          </NavLink>
        </div>
        <div className="mr-5 md:mb-5 group">
          <NavLink
            className={(navData) =>
              navData.isActive ? activeStyle : inactiveStyle
            }
            to="/explore"
          >
            Explore
          </NavLink>
        </div>
        <div className="mr-5 md:mb-5 group">
          <NavLink
            className={(navData) =>
              navData.isActive ? activeStyle : inactiveStyle
            }
            to="/account"
          >
            Account
          </NavLink>
        </div>
        <div
          className="text-sm cursor-pointer bg-zinc-400 px-3 py-1 rounded text-zinc-900 font-semibold whitespace-nowrap opacity-70 hover:opacity-100 transition-colors"
          onClick={handleLogOut}
        >
          Log Out
        </div>
      </div>
    </div>
  );
}
