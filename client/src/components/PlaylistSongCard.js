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
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setPlaylist(data);
          cardRender(data);
        });
      } else {
        r.json().then((data) => console.log(data));
      }
    });
  }

  const removeSongButton = (
    <div onClick={handleDelete}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 hover:text-red-400 cursor-pointer transition-colors"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  return (
    <div className="group flex mb-1 px-5 py-3 items-center w-full rounded hover:bg-zinc-800 transition-colors">
      <div className="mr-5">{index + 1}</div>
      <img className="w-14 mr-5" src={playlist_song.song_image} />
      <div className="w-11/12">
        <span className="text-zinc-100 text-md">
          {playlist_song.song_title} <br />
        </span>
        <span className="text-zinc-600 text-sm group-hover:text-zinc-100 transition-colors">
          {playlist_song.song_artist}
        </span>
      </div>
      <div className="mr-5">{playlist_song.song_length}</div>
      {canRemove ? removeSongButton : null}
    </div>
  );
}
