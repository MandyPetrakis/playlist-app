export default function SongCard({ song }) {
  return (
    <div>
      {song.title}
      {song.artist}
      {song.length}
    </div>
  );
}
