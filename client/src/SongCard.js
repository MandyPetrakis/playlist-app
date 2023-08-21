import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SongCard({
  song,
  playlist,
  setPlaylist,
  moreOptions,
  cardRender,
  canAdd,
}) {
  const [modal, setModal] = useState();
  let navigate = useNavigate();

  function routeChange(playlistId) {
    let path = `/${playlistId}`;
    navigate(path);
  }

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
        cardRender(data);
      });
  }

  function toggleModal() {
    setModal(!modal);
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

  const menuButton = (
    <div
      className="group-hover:visible invisible cursor-pointer"
      onClick={toggleModal}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  const modalRender = () => {
    const appearsOn = song.playlists.map((p) => (
      <div
        key={p.id}
        className="uppercase ml-2 cursor-pointer hover:text-emerald-200 "
        onClick={() => routeChange(p.id)}
      >
        {p.title}
      </div>
    ));

    return (
      <div key={Math.random}>
        <div
          onClick={toggleModal}
          className="z-10 w-full h-full top-0 left-0 right-0 bottom-0 fixed"
        ></div>
        <div
          onClick={() => {
            toggleModal();
          }}
          className="w-screen h-screen top-0 left-0 right-0 bottom-0 fixed"
        ></div>
        <div className="z-20 absolute right-11 bottom-9 bg-zinc-700 p-8 rounded max-w-md min-w-md grid place-content-center">
          <div className="text-emerald-500 font-semibold">Appears on</div>
          {appearsOn}
        </div>
      </div>
    );
  };

  return (
    <div className="group flex relative mb-1 px-5 py-3 items-center w-full rounded hover:bg-zinc-800 transition-colors">
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
      <div className="mr-5">{song.length}</div>
      {moreOptions ? menuButton : null}
      {modal ? modalRender() : null}
    </div>
  );
}
