import { createContext, useContext, useState, useEffect } from "react";

const CurrentUser = createContext();
const Playlists = createContext();
const CurrentPlaylist = createContext();

export function useCurrentUser() {
  return useContext(CurrentUser);
}

export function usePlaylists() {
  return useContext(Playlists);
}

export function useCurrentPlaylist() {
  return useContext(CurrentPlaylist);
}

export default function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState();

  useEffect(() => {
    fetch("/playlists")
      .then((r) => r.json())
      .then((data) => setPlaylists(data));
  }, []);

  return (
    <CurrentPlaylist.Provider value={[currentPlaylist, setCurrentPlaylist]}>
      <Playlists.Provider value={[playlists, setPlaylists]}>
        <CurrentUser.Provider value={[currentUser, setCurrentUser]}>
          {children}
        </CurrentUser.Provider>
      </Playlists.Provider>
    </CurrentPlaylist.Provider>
  );
}
