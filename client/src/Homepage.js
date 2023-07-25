import { useCurrentUser } from "./Context";
import Playlists from "./Playlists";

export default function Homepage() {
  const [currentUser, setCurrentUser] = useCurrentUser();

  return (
    <>
      <div>Welcome, {currentUser.first_name}!</div>
      <Playlists />
    </>
  );
}
