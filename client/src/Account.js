import { useCurrentUser } from "./Context";

export default function Account() {
  const [currentUser, setCurrentUser] = useCurrentUser();
  return (
    <>
      <div>
        Username: {currentUser.username}
        Email: {currentUser.email}
        Playlists: {currentUser.playlists.length}
        Memeber Since: {currentUser.member_since}
      </div>
    </>
  );
}
