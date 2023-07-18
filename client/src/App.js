import "./App.css";
import Auth from "./Auth";
import Homepage from "./Homepage";
// import { useCurrentUser } from "./Context";
import { useState } from "react";

function App() {
  // const [currentUser, setCurrentUser] = useCurrentUser();
  const [showLogIn, setShowLogIn] = useState(true);

  return (
    <div className="App">
      {showLogIn ? <Auth setShowLogIn={setShowLogIn} /> : <Homepage />}
    </div>
  );
}

export default App;
