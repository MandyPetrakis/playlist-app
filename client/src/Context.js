import { createContext, useContext, useState, useEffect } from "react";

const CurrentUser = createContext();
const Playlists = createContext();
const CurrentPlaylist = createContext();
const Songs = createContext();

export function useCurrentUser() {
  return useContext(CurrentUser);
}

export function usePlaylists() {
  return useContext(Playlists);
}

export function useCurrentPlaylist() {
  return useContext(CurrentPlaylist);
}

export function useSongs() {
  return useContext(Songs);
}

export default function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/playlists")
      .then((r) => r.json())
      .then((data) => setPlaylists(data));
    fetch("/songs")
      .then((r) => r.json())
      .then((data) => setSongs(data));
  }, []);

  return (
    <Songs.Provider value={songs}>
      <CurrentPlaylist.Provider value={[currentPlaylist, setCurrentPlaylist]}>
        <Playlists.Provider value={[playlists, setPlaylists]}>
          <CurrentUser.Provider value={[currentUser, setCurrentUser]}>
            {children}
          </CurrentUser.Provider>
        </Playlists.Provider>
      </CurrentPlaylist.Provider>
    </Songs.Provider>
  );
}
