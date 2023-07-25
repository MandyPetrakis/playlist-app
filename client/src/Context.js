import { createContext, useContext, useState, useEffect } from "react";

const CurrentUser = createContext();
const Playlists = createContext();

export function useCurrentUser() {
  return useContext(CurrentUser);
}

export function usePlaylists() {
  return useContext(Playlists);
}

export default function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("/playlists")
      .then((r) => r.json())
      .then((data) => setPlaylists(data));
  }, []);

  return (
    <Playlists.Provider value={[playlists, setPlaylists]}>
      <CurrentUser.Provider value={[currentUser, setCurrentUser]}>
        {children}
      </CurrentUser.Provider>
    </Playlists.Provider>
  );
}
