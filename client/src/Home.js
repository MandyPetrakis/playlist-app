import { useCurrentUser } from "./Context";
import { useLoaderData } from "react-router-dom";
import PlaylistCard from "./PlaylistCard";

export const playlistsLoader = async () => {
  const res = await fetch("/playlists");
  const playlists = await res.json();
  return playlists;
};

export default function Home() {
  const playlists = useLoaderData();
  const [currentUser] = useCurrentUser();

  const yourPlaylists = playlists
    .filter((p) => p.user_id === currentUser.id)
    .map((p) => <PlaylistCard key={p.id} playlist={p} hideUser={true} />);

  const homePlaylists = playlists
    .filter((p) => currentUser.id !== p.user_id)
    .slice(0, 9)
    .map((p) => <PlaylistCard key={p.id} playlist={p} />);

  return (
    <div>
      <div className="text-lg mb-5 float-right">
        Hi, {currentUser.first_name}!
      </div>
      <div className="text-2xl mb-1 text-emerald-300">Your Playlists</div>
      <div className="flex flex-initial overflow-scroll scrollbar-hide">
        {yourPlaylists}
      </div>
      <span className="text-2xl mb-1 text-emerald-300">
        Playlists we think you'll like
      </span>
      <div className="flex flex-initial  overflow-scroll scrollbar-hide">
        {homePlaylists}
      </div>
    </div>
  );
}
