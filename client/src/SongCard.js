import { useState } from "react";

export default function SongCard({
  song,
  currentPlaylist,
  setCurrentPlaylist,
}) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    let addedSong = {
      playlist_id: currentPlaylist.id,
      song_id: song.id,
      order: 1,
    };

    fetch("/playlist_songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedSong),
    })
      .then((r) => r.json())
      .then((playlist) => {
        setCurrentPlaylist(playlist);
        setAdded(true);
      });
  }

  function handleDelete() {
    fetch(`/playlist_songs/${song.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json)
      .then((data) => console.log(data));
  }

  return (
    <div className="flex mb-1 items-center w-full p-2 rounded hover:bg-zinc-800 transition-colors">
      {added ? (
        <div className="grid place-content-center w-10 h-10 rounded hover:bg-emerald-500 mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : (
        <div
          className="grid place-content-center w-10 h-10 rounded hover:bg-emerald-500 mr-3"
          onClick={handleAdd}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <img className="w-10 mr-5" src={song.image} />
      <div>
        {song.title} <br />
        {song.artist}
      </div>
      <div className="absolute right-14 p-10">{song.length}</div>
    </div>
  );
}
