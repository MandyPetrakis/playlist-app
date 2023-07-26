import { useCurrentPlaylist } from "./Context";
import SongCard from "./SongCard";

export default function ViewPlaylist() {
  const [currentPlaylist, setCurrentPlaylist] = useCurrentPlaylist();

  const playlistSongs = currentPlaylist.songs.map((s) => (
    <SongCard key={s.id} song={s} />
  ));

  return playlistSongs;
}
