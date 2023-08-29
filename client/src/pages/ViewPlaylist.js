import { useCurrentUser, useSongs, useCards } from "../Context";
import SongCard from "../components/SongCard";
import { DnDContainer } from "../components/DnDContainer";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const vPlaylistLoader = async ({ params }) => {
  const res = await fetch(`/playlists/${params.playlistId}`);
  const playlist = await res.json();
  return playlist;
};

export default function ViewPlaylist() {
  const [songs] = useSongs();
  const currentPlaylist = useLoaderData();
  const [playlist, setPlaylist] = useState(currentPlaylist);
  const [currentUser] = useCurrentUser();
  const canRemove = currentPlaylist.user_id === currentUser.id;
  const [_, setCards] = useCards();
  const [playlistName, setPlaylistName] = useState(playlist.title);
  const [playlistMood, setPlaylistMood] = useState(playlist.mood);
  const [editing, setEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/library`;
    navigate(path);
  };

  async function handleDelete() {
    const res = await fetch(`/playlists/${playlist.id}`, {
      method: "DELETE",
    });
    const deleted = await res.json();
    return routeChange();
  }

  function handleEdit(e) {
    e.preventDefault();
    let data = {
      title: playlistName,
      mood: playlistMood,
    };

    fetch(`/playlists/${playlist.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((data) => {
        setPlaylist(data);
        setEditing(false);
        setShowOptions(false);
      });
  }

  function cardRender(playlist) {
    setCards(
      playlist.playlist_songs.map((s) => ({
        id: s.id,
        userId: s.user_id,
        text: s,
      }))
    );
  }

  useEffect(() => {
    cardRender(playlist);
  }, []);

  const playlistDetails = (
    <div className="w-96">
      <span className="text-5xl uppercase">{playlist.title}</span>
      <div className="mb-3 font-extralight text-lg">
        <span className="text-emerald-300">mood </span>- {playlist.mood} |{" "}
        {playlist.playlist_songs.length} songs
      </div>
      <div className="mb-3 font-extralight text-lg">
        <span className="font-light text-zinc-500">by </span>
        <span className="font-semibold text-zinc-200">{playlist.username}</span>
      </div>
    </div>
  );

  const playlistDetailsEdit = (
    <div className="w-96 mr-5">
      <form onSubmit={handleEdit}>
        <input
          autoFocus
          className="border-b-2 border-zinc-700 text-5xl bg-inherit uppercase focus:outline-none leading-5 mb-2 text-white"
          type="text"
          placeholder={playlistName}
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <br />

        <span className="text-emerald-300">mood </span>
        <input
          className=" border-b-2 border-zinc-700 bg-inherit lowerercase focus:outline-none leading-5 text-white mb-3 font-extralight text-lg ml-5"
          type="text"
          placeholder={playlistMood}
          value={playlistMood}
          onChange={(e) => setPlaylistMood(e.target.value)}
        />
      </form>

      <div className="mb-3 font-extralight text-lg">
        <span className="font-light text-zinc-500">by </span>
        <span className="font-semibold text-zinc-200">{playlist.username}</span>
      </div>
    </div>
  );

  const moreOptionsIcon = (
    <div
      className="invisible group-hover:visible w-44"
      onClick={() => setShowOptions(!showOptions)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={` hover:text-emerald-500 w-14 h-14 ml-5 cursor-pointer 
        } `}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
    </div>
  );
  const moreOptions = (
    <div className="grid mr-5 text-sm w-44 relative pr-10 pt-10">
      <button
        onClick={editing ? (e) => handleEdit(e) : () => setEditing(true)}
        className="text-zinc-900 mb-5 rounded  px-2 py-1 bg-emerald-400"
      >
        {editing ? "Save" : "Edit Details"}
      </button>
      <button
        onClick={() => handleDelete()}
        className="cursor-pointer bg-red-700 px-2 py-1 rounded text-zinc-300 whitespace-nowrap"
      >
        Delete Playlist
      </button>
      <div
        onClick={() => {
          setEditing(false);
          setShowOptions(false);
        }}
        className="absolute right-0 top-0 p-1 "
      >
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
    </div>
  );

  const songSuggestions = songs
    .sort(() => 0.5 - Math.random())
    .slice(0, 14)
    .map((s) => (
      <SongCard
        key={s.id}
        song={s}
        moreOptions={true}
        playlist={playlist}
        setPlaylist={setPlaylist}
        cardRender={cardRender}
        canAdd={true}
      />
    ));

  const ownerPlaylist = (
    <>
      <DnDContainer
        cardRender={cardRender}
        canRemove={canRemove}
        setPlaylist={setPlaylist}
        playlist={playlist}
      />

      <div className="text-2xl font-bold">Recommended</div>
      <div className="text-md font-light mb-5">
        Based on what's in this playlist
      </div>
      {songSuggestions}
    </>
  );

  const nonOwnerPlaylist = playlist.playlist_songs.map((s, index) => {
    let song = {
      id: s.song_id,
      image: s.song_image,
      length: s.song_length,
      title: s.song_title,
      artist: s.song_artist,
      order: index + 1,
    };
    return <SongCard key={s.id} song={song} canAdd={false} />;
  });

  const defaultImage = (
    <img
      className="border-2 border-emerald-400 rounded mr-5 w-52 h-52"
      src="https://e1.pxfuel.com/desktop-wallpaper/389/930/desktop-wallpaper-spotify-playlist-cover-playlist-covers.jpg"
      alt="playlist cover"
    />
  );

  return (
    <div className="w-full">
      <div className="flex justify-around items-center group mb-10">
        {playlist.image ? (
          <img
            src={playlist.image}
            className="border-2 border-emerald-400 rounded mr-5"
          />
        ) : (
          defaultImage
        )}
        {editing ? playlistDetailsEdit : playlistDetails}
        {canRemove ? (
          showOptions ? (
            moreOptions
          ) : (
            moreOptionsIcon
          )
        ) : (
          <div className="invisible w-14"></div>
        )}
      </div>
      <div className="px-16">
        {currentUser.id === playlist.user_id ? ownerPlaylist : nonOwnerPlaylist}
      </div>
    </div>
  );
}
