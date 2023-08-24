import Auth from "./pages/Auth";
import NavBar from "./components/NavBar";
import { useCurrentUser } from "./Context";
import { useState, useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Bars } from "react-loader-spinner";

function App() {
  const [_, setCurrentUser] = useCurrentUser();
  const [showLogIn, setShowLogIn] = useState(true);
  const navigation = useNavigation();

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

  const loadingIndicator = (
    <div className="grid place-content-center mt-32 md:mt-40 md:col-span-4">
      <Bars
        height="80"
        width="80"
        color="rgb(52 211 153)"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );

  return (
    <div className="text-gray-200 bg-black">
      {showLogIn ? (
        <Auth setShowLogIn={setShowLogIn} />
      ) : (
        <div className="md:grid grid-cols-5">
          <div className="md:block md:col-span-1">
            <NavBar setShowLogIn={setShowLogIn} />
          </div>
          {navigation.state === "loading" ? (
            loadingIndicator
          ) : (
            <div className="md:col-span-4 px-10 md:py-16">
              <DndProvider backend={HTML5Backend}>
                <Outlet />
              </DndProvider>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
