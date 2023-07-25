export default function PlaylistSongs({ playlist }) {
  const playlistSongs = playlist.songs.map((s) => (
    <div key={s.id}>
      Title: {s.title} Artist: {s.artist} {s.length}
    </div>
  ));

  return playlistSongs;
}
