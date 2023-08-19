import { useState } from "react";
import { useSongs } from "./Context";
import SongCard from "./SongCard";
import { useLoaderData } from "react-router-dom";
import PlaylistCard from "./PlaylistCard";

export default function Explore() {
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [errors, setErrors] = useState();
  const [songs, setSongs] = useSongs();
  const [visibleSongs, setVisibleSongs] = useState(20);
  const playlists = useLoaderData();

  const explorePlaylists = playlists.map((p) => <PlaylistCard playlist={p} />);

  const exploreSongs = songs
    .slice(0, visibleSongs)
    .map((s) => <SongCard key={s.id} song={s} />);

  function handleAddSong(e) {
    e.preventDefault();

    let song = {
      title: songTitle,
      artist: artist,
      length: "3:45",
    };

    fetch("/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newSong) => {
          setSongs([newSong, ...songs]);
          setSongTitle("");
          setArtist("");
        });
      } else {
        r.json().then((e) => {
          setErrors(e);
        });
      }
    });
  }
  return (
    <>
      <span className="text-3xl mb-1">Explore Playlists:</span>
      <div className="flex overflow-scroll scrollbar-hide text-xl">
        {explorePlaylists}
      </div>
      <div className="text-3xl mb-5">Song Library:</div>
      <div className="">
        <div className="mb-2 text-xs font-extralight">Add song to library:</div>
        <div className="flex mb-3  justify-between items-center w-full pl-8 py-3 rounded  hover:bg-zinc-800 transition-colors group">
          <div>
            <form onSubmit={handleAddSong}>
              <input
                className="bg-transparent focus:outline-none mb-1"
                type="text"
                value={songTitle}
                placeholder="Title"
                onChange={(e) => setSongTitle(e.target.value)}
              />
              <br />
              <input
                className="bg-transparent focus:outline-none"
                type="text"
                value={artist}
                placeholder="Artist"
                onChange={(e) => setArtist(e.target.value)}
              />
            </form>
          </div>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="rounded w-14 text-zinc-200 mr-5 group-hover:bg-emerald-500 transition-colors"
              onClick={handleAddSong}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        {errors ? (
          <div className="text-red-500 text-sm font-light mb-3 ml-10">
            {errors.errors.map((e) => (
              <li>{e}</li>
            ))}{" "}
          </div>
        ) : null}

        {exploreSongs}
        <button
          className="mb-5 bg-zinc-900 px-3 py-2 opacity-80 rounded hover:opacity-100 w-full"
          onClick={() => setVisibleSongs(visibleSongs + 10)}
        >
          Load More Songs
        </button>
      </div>
    </>
  );
}
