export default function PlaylistSongCard({
  playlist_song,
  setPlaylist,
  canRemove,
  cardRender,
  index,
}) {
  function handleDelete() {
    fetch(`/playlist_songs/${playlist_song.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((data) => {
        setPlaylist(data);
        cardRender(data);
      });
  }

  return (
    <div className="flex mb-1 items-center w-full p-2 rounded hover:bg-zinc-800 transition-colors">
      <div className="mr-5">{index + 1}</div>

      <img className="w-10 mr-5" src={playlist_song.song_image} />
      <div>
        {playlist_song.song_title} <br />
        {playlist_song.song_artist}
      </div>
      <div className="absolute right-14 p-10">{playlist_song.song_length}</div>
      {canRemove ? (
        <div className="absolute right-11 group" onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 group-hover:text-red-400"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : null}
    </div>
  );
}
