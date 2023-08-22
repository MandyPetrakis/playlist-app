import { useCurrentUser } from "./Context";
import { useState } from "react";
import SongCard from "./SongCard";
import PlaylistCard from "./PlaylistCard";
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
      className="create-playlist rounded bg-zinc-900 hover:bg-emerald-500 m-4 p-4 w-40 min-w-fit h-64 transition-colors group"
      onClick={() => setCreatingNew(!creatingNew)}
    >
      <div className="flex place-content-center group-hover:bg-zinc-200 rounded w-36 h-36 transition-colors">
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
      <div
        className="mt-10 uppercase font-semibold
  "
      >
        Create Playlist
      </div>
    </div>
  );

  const createPlaylistForm = (
    <div className="rounded bg-zinc-900 hover:bg-zinc-800 m-4 p-4 w-44 h-64 transition-colors ">
      <div className="grid place-content-center mx-auto rounded w-36 h-36 group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="rounded w-24 text-zinc-200 transition-colors"
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
      <div>
        <form onSubmit={handleNewPlaylist}>
          <input
            className={`bg-transparent focus:outline-none ${
              errors ? "placeholder-red-500" : null
            }`}
            type="text"
            value={title}
            placeholder={`${errors ? "*Title" : "Title"}`}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            className={`bg-transparent focus:outline-none ${
              errors ? "placeholder-red-500" : null
            }`}
            type="text"
            value={mood}
            placeholder={`${errors ? "*Mood" : "Mood"}`}
            onChange={(e) => setMood(e.target.value)}
          />
          <br />
          <button
            className="bg-emerald-500 px-3 py-1 rounded ml-16"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );

  function handleNewPlaylist(e) {
    e.preventDefault();

    let playlist = {
      title: title,
      mood: mood,
      user_id: currentUser.id,
      image: image,
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

  return (
    <div>
      <div className="text-3xl text-emerald-300 mb-1">Your Playlists</div>
      <div className="flex overflow-scroll scrollbar-hide mb-5 py-5 border-b-2  border-zinc-700">
        {createPlaylistDiv}
        {creatingNew ? createPlaylistForm : null}
        {yourPlaylists}
      </div>
      <div className="text-3xl text-emerald-300 mb-5">Liked Songs</div>
      <div className="">{likedSongs}</div>
    </div>
  );
}
