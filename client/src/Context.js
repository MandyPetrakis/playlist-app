import { createContext, useContext, useState } from "react";

const CurrentUser = createContext();

export function useCurrentUser() {
  return useContext(CurrentUser);
}

export default function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  return (
    <CurrentUser.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </CurrentUser.Provider>
  );
}
