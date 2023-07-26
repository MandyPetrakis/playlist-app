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
    <div className="App">
      {showLogIn ? (
        <Auth setShowLogIn={setShowLogIn} />
      ) : (
        <>
          <NavBar setShowLogIn={setShowLogIn} />
          <Outlet />
        </>
      )}
    </div>
  );
}

export default App;
