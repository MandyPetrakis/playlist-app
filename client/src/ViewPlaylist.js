import { useCurrentUser, useSongs, useCards } from "./Context";
import SongCard from "./SongCard";
import { DnDContainer } from "./DnDContainer";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const playlistL = async ({ params }) => {
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
  const [modal, setModal] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist.title);
  const [playlistMood, setPlaylistMood] = useState(playlist.mood);

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
        toggleModal();
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

  function toggleModal() {
    setModal(!modal);
    setPlaylistName(playlist.title);
    setPlaylistMood(playlist.mood);
  }

  const ownerMenuOptions = (
    <>
      <div onClick={() => setModal(!modal)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={` hover:text-emerald-500 w-7 h-7 mx-5 cursor-pointer ${
            modal ? " text-emerald-500" : "text-emerald-300"
          } `}
        >
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
        </svg>
      </div>
    </>
  );

  const modalRender = (
    <div>
      <div
        onClick={toggleModal}
        className="w-full h-full top-0 left-0 right-0 bottom-0 fixed bg-emerald-100 opacity-40"
      ></div>
      <div className="absolute mx-auto mt-20 bg-zinc-800 px-10 py-10 rounded max-w-xl min-w-md grid place-content-center">
        <form className="grid mb-2" onSubmit={handleEdit}>
          <label className="text-zinc-500">Title </label>
          <input
            className="bg-inherit uppercase focus:outline-none leading-5 mb-2 text-white"
            type="text"
            placeholder={playlistName}
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />

          <br />
          <label className="text-zinc-500">Mood </label>
          <input
            className="bg-inherit lowerercase focus:outline-none leading-5 mb-4 text-white"
            type="text"
            placeholder={playlistMood}
            value={playlistMood}
            onChange={(e) => setPlaylistMood(e.target.value)}
          />

          <button className="bg-emerald-500 rounded px-2 py-1 ">
            Save Details
          </button>
        </form>

        <button onClick={() => handleDelete()} className="text-red-500 h-8">
          Delete Playlist
        </button>
        <div className="absolute top-2.5 right-2.5" onClick={toggleModal}>
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
        playlist={playlist}
        setPlaylist={setPlaylist}
        cardRender={cardRender}
        canAdd={true}
      />
    ));

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

  return (
    <div className={` w-9/12 ${modal ? "fixed overflow-hidden" : null}`}>
      <div className="flex content-stretch">
        <span className="text-3xl uppercase">{playlist.title}</span>
        {canRemove ? ownerMenuOptions : null}
        {modal && modalRender}
      </div>
      <div className="mb-3 font-extralight">
        mood: {currentPlaylist.mood} | {currentPlaylist.playlist_songs.length}{" "}
        songs
      </div>
      <div className="mb-3 font-extralight">by: {currentPlaylist.username}</div>
      {currentUser.id === playlist.user_id ? (
        <>
          <DnDContainer
            cardRender={cardRender}
            canRemove={canRemove}
            setPlaylist={setPlaylist}
            playlist={playlist}
          />

          <div className=" text-lg font-bold">Recommended</div>
          <div className="text-xs font-light mb-5">
            Based on what's in this playlist
          </div>
          {songSuggestions}
        </>
      ) : (
        <>{nonOwnerPlaylist}</>
      )}
    </div>
  );
}
