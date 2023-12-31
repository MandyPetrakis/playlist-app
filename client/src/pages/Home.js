import { useCurrentUser } from "../Context";
import { useLoaderData } from "react-router-dom";
import PlaylistCard from "../components/PlaylistCard";

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
      <div className="text-lg text-zinc-400 font-semibold mb-5 float-right">
        Hi, {currentUser.first_name}!
      </div>
      <div className="text-3xl mb-5 text-zinc-100">Your Playlists</div>
      <div className="flex flex-initial mb-6 pb-6 border-b-2 border-zinc-700 overflow-scroll scrollbar-hide w-full">
        {yourPlaylists}
      </div>
      <div className="text-xl mb-5 text-zinc-300">
        Playlists we think you'll like
      </div>
      <div className="flex border-b-2 pb-6 mb-5 border-zinc-700 flex-initial  overflow-scroll scrollbar-hide">
        {homePlaylists}
      </div>
    </div>
  );
}
