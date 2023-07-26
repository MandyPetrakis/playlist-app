import { useCurrentUser, usePlaylists } from "./Context";

import PlaylistCard from "./PlaylistCard";

export default function Home() {
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [playlists, setPlaylists] = usePlaylists();

  const homePlaylists = playlists
    .filter((p) => currentUser.mood_list.includes(p.mood))
    .slice(0, 9)
    .map((p) => <PlaylistCard key={p.id} playlist={p} />);

  const yourPlaylists = playlists
    .filter((p) => p.user_id === currentUser.id)
    .slice(0, 9)
    .map((p) => <PlaylistCard key={p.id} playlist={p} />);

  return (
    <>
      <div>Welcome, {currentUser.first_name}!</div>
      <div className="flex-row">
        <div>
          Your Playlists:
          {yourPlaylists}
        </div>
        <div>
          Playlists we this you'll like:
          {homePlaylists}
        </div>
      </div>
    </>
  );
}
