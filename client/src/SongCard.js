import { useState } from "react";

export default function SongCard({
  song,
  playlist,
  setPlaylist,
  cardRender,
  canAdd,
}) {
  const [wasAdded, setAdded] = useState(false);

  function handleAdd() {
    let addedSong = {
      playlist_id: playlist.id,
      song_id: song.id,
    };

    fetch("/playlist_songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedSong),
    })
      .then((r) => r.json())
      .then((data) => {
        setPlaylist(data);
        setAdded(true);
        cardRender(data);
      });
  }

  const addButton = (
    <div
      className="grid p-2 place-content-center rounded hover:bg-emerald-500 mr-5"
      onClick={handleAdd}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  return (
    <div className="group flex mb-1 px-5 py-3 items-center w-full rounded hover:bg-zinc-800 transition-colors">
      {canAdd ? addButton : null}
      <img
        className="w-14 mr-5"
        src={
          song.image
            ? song.image
            : "https://e1.pxfuel.com/desktop-wallpaper/389/930/desktop-wallpaper-spotify-playlist-cover-playlist-covers.jpg"
        }
      />
      <div className="w-11/12">
        <span className="text-zinc-100 text-md">{song.title} </span> <br />
        <span className="text-zinc-600 text-sm group-hover:text-zinc-100 transition-colors">
          {song.artist}
        </span>
      </div>
      <div className="">{song.length}</div>
    </div>
  );
}
