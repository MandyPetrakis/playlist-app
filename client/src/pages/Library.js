import { useCurrentUser } from "../Context";
import { useState } from "react";
import SongCard from "../components/SongCard";
import PlaylistCard from "../components/PlaylistCard";
import { useLoaderData } from "react-router-dom";

export const userPlaylistsLoader = async () => {
  const res = await fetch(`/user/playlists`);
  const playlists = await res.json();
  return playlists;
};

export default function Library() {
  const playlists = useLoaderData();
  const [currentUser] = useCurrentUser();
  const [renderPlaylists, setRenderPlaylists] = useState(playlists);
  const [creatingNew, setCreatingNew] = useState(false);
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState();

  const yourPlaylists = renderPlaylists
    .filter((p) => p.user_id === currentUser.id)
    .map((p) => <PlaylistCard key={p.id} playlist={p} hideUser={true} />);

  const likedSongs = currentUser.liked_songs.map((s) => (
    <SongCard key={s.id} moreOptions={false} song={s} canAdd={false} />
  ));

  const createPlaylistDiv = (
    <div
      className={`cursor-pointer rounded bg-zinc-900 hover:bg-emerald-500 p-4 mr-3 w-44 h-64 transition-colors group ${
        creatingNew ? "hidden" : "visible"
      }`}
      onClick={() => {
        setCreatingNew(!creatingNew);
        setErrors();
      }}
    >
      <div className="flex place-content-center cursor-pointer group-hover:bg-zinc-200 rounded w-36 h-36 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="rounded w-24 text-zinc-200 group-hover:text-zinc-600 transition-colors"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <div className="mt-10 uppercase font-semibold">Create Playlist</div>
    </div>
  );

  function handleNewPlaylist(e) {
    e.preventDefault();

    let playlist = {
      title: title,
      mood: mood,
    };
    fetch("/playlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlist),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newPlaylist) => {
          setRenderPlaylists([newPlaylist, ...renderPlaylists]);
          setTitle("");
          setMood("");
          setCreatingNew(false);
        });
      } else {
        r.json().then((e) => {
          setErrors(e);
        });
      }
    });
  }

  const createPlaylistForm = (
    <div className="rounded bg-zinc-900 hover:bg-zinc-800 p-3 h-64 w-44 transition-colors mr-3 relative">
      <div className="grid place-content-center mt-3 w-36 h-32 group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="rounded w-24 text-zinc-300 transition-colors"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
          />
        </svg>
        {/* <div className="mx-auto rounded w-36 h-36 hidden group-hover:grid place-content-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="rounded w-14 mb-3 mx-auto text-zinc-200  "
      >
        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
      </svg>
      <span className="text-xs text-center hidden group-hover:block">
        Choose Photo
      </span>
    </div> */}
      </div>
      <div className="overflow-hidden">
        <form className="px-2" onSubmit={(e) => handleNewPlaylist(e)}>
          <input
            autoFocus
            className={`bg-transparent focus:outline-none mb-1 w-36 ${
              errors ? "placeholder-red-500" : null
            }`}
            type="text"
            value={title}
            placeholder={`${errors ? "* Title" : "Title"}`}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />

          <input
            className={`bg-transparent focus:outline-none mb-1 w-36 ${
              errors ? "placeholder-red-500" : null
            }`}
            type="text"
            value={mood}
            placeholder={`${errors ? "* Mood" : "Mood"}`}
            onChange={(e) => setMood(e.target.value)}
          />
          <br />
          <div className="grid place-content-center">
            <button
              onClick={handleNewPlaylist}
              className="bg-emerald-500 px-3 py-1 rounded"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setCreatingNew(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-zinc-300  group-hover:text-red-400"
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

  return (
    <div>
      <div className="text-3xl text-zinc-100 mb-5">Your Playlists</div>
      <div className="flex overflow-scroll scrollbar-hide mb-5 pb-6 border-b-2  border-zinc-700">
        {createPlaylistDiv}
        {creatingNew ? createPlaylistForm : null}
        {yourPlaylists}
      </div>
      <div className="text-xl text-zinc-300 mb-5">Liked Songs</div>
      <div className="">{likedSongs}</div>
    </div>
  );
}
