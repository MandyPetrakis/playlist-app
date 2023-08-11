import Auth from "./Auth";
import NavBar from "./NavBar";
import { useCurrentUser } from "./Context";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [showLogIn, setShowLogIn] = useState(true);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setCurrentUser(user);
          setShowLogIn(false);
        });
      }
    });
  }, []);

  return (
    <div className="text-gray-200 m-10 bg-black">
      {showLogIn ? (
        <Auth setShowLogIn={setShowLogIn} />
      ) : (
        <div className="md:grid grid-cols-5">
          <div className="md:block md:col-span-1">
            <NavBar setShowLogIn={setShowLogIn} />
          </div>
          <div className="md:col-span-4">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
