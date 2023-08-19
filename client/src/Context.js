import { createContext, useContext, useState, useEffect } from "react";

const CurrentUser = createContext();
const Songs = createContext();
const Cards = createContext();

export function useCurrentUser() {
  return useContext(CurrentUser);
}

export function useSongs() {
  return useContext(Songs);
}

export function useCards() {
  return useContext(Cards);
}

export default function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [songs, setSongs] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/songs")
      .then((r) => r.json())
      .then((data) => setSongs(data));
  }, []);

  return (
    <Songs.Provider value={[songs, setSongs]}>
      <CurrentUser.Provider value={[currentUser, setCurrentUser]}>
        <Cards.Provider value={[cards, setCards]}>{children}</Cards.Provider>
      </CurrentUser.Provider>
    </Songs.Provider>
  );
}
