import Auth from "./Auth";
import NavBar from "./NavBar";
import { useCurrentUser } from "./Context";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [_, setCurrentUser] = useCurrentUser();
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
    <div className="text-gray-200 bg-black">
      {showLogIn ? (
        <Auth setShowLogIn={setShowLogIn} />
      ) : (
        <div className="md:grid grid-cols-5">
          <div className="md:block md:col-span-1">
            <NavBar setShowLogIn={setShowLogIn} />
          </div>
          <div className="md:col-span-4 p-10">
            <DndProvider backend={HTML5Backend}>
              <Outlet />
            </DndProvider>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
