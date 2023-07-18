import { useCurrentUser } from "./Context";
import Playlists from "./Playlists";

export default function Homepage() {
  const [currentUser, setCurrentUser] = useCurrentUser();
  console.log(currentUser);
  return (
    <>
      <div>Welcome, {currentUser.first_name}!</div>
      <Playlists />
    </>
  );
}
