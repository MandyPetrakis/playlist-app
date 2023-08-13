import { useCurrentUser, usePlaylists } from "./Context";
import { useLoaderData } from "react-router-dom";
import PlaylistCard from "./PlaylistCard";

export const playlistsLoader = async () => {
  const res = await fetch("/playlists");
  const playlists = await res.json();
  return playlists;
};

export default function Home() {
  const playlists = useLoaderData();
  const [currentUser, setCurrentUser] = useCurrentUser();

  const yourPlaylists = playlists
    .filter((p) => p.user_id === currentUser.id)
    .slice(0, 9)
    .map((p) => <PlaylistCard key={p.id} playlist={p} hideUser={true} />);

  const homePlaylists = playlists
    .filter((p) => currentUser.mood_list.includes(p.mood))
    .slice(0, 9)
    .map((p) => <PlaylistCard key={p.id} playlist={p} />);

  return (
    <>
      <div>Welcome, {currentUser.first_name}!</div>
      Your Playlists:
      <div className="flex overflow-scroll">{yourPlaylists}</div>
      Playlists we think you'll like:
      <div className="flex overflow-scroll">{homePlaylists}</div>
    </>
  );
}
