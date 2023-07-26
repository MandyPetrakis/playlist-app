import { usePlaylists, useCurrentUser } from "./Context";
import PlaylistCard from "./PlaylistCard";
import SongCard from "./SongCard";

export default function Library() {
  const [playlists, setPlaylists] = usePlaylists();
  const [currentUser, setCurrentUser] = useCurrentUser();

  const yourPlaylists = playlists
    .filter((p) => p.user_id === currentUser.id)
    .slice(0, 9)
    .map((p) => <PlaylistCard key={p.id} playlist={p} />);

  const likedSongs = currentUser.liked_songs.map((s) => (
    <SongCard key={s.id} song={s} />
  ));

  return (
    <div>
      <div>
        Your Playlists:
        {yourPlaylists}
      </div>
      Liked Songs:
      {likedSongs}
    </div>
  );
}
