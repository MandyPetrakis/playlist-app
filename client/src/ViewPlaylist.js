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
  const songs = useSongs();
  const currentPlaylist = useLoaderData();
  const [playlist, setPlaylist] = useState(currentPlaylist);
  const [currentUser] = useCurrentUser();
  const canRemove = currentPlaylist.user_id === currentUser.id;
  const [_, setCards] = useCards();
  const [showMenu, setShowMenu] = useState(false);
  let navigate = useNavigate();
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [errors, setErrors] = useState();

  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

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

  function handleDelete() {
    fetch(`/playlists/${playlist.id}`, {
      method: "DELETE",
    })
      .then(async (r) => {
        await r.json();
      })
      .then(routeChange());
  }

  function handeAddSong(e) {
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
          setPlaylist([...playlist, newSong]);
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
    <div className="">
      <div className="flex content-stretch">
        <span className="text-3xl uppercase">{playlist.title}</span>
        {canRemove ? (
          <>
            <div onClick={() => setShowMenu(!showMenu)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-8 h-8 mx-5 ${
                  showMenu ? "rotate-90" : null
                } transition`}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM15.375 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="static">
              <button
                onClick={() => handleDelete()}
                className={`text-red-500 h-8 absolute ${
                  showMenu ? "visible" : "invisible"
                }`}
              >
                Delete Playlist
              </button>
            </div>
          </>
        ) : null}
      </div>
      <div className="mb-3 font-extralight">
        {currentPlaylist.username} | {currentPlaylist.playlist_songs.length}{" "}
        songs
      </div>
      {currentUser.id === playlist.user_id ? (
        <>
          <DnDContainer
            cardRender={cardRender}
            canRemove={canRemove}
            setPlaylist={setPlaylist}
            playlist={playlist}
          />
          <div className="flex mb-3 items-center w-full p-2 rounded  hover:bg-zinc-800 transition-colors group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="rounded w-14 text-zinc-200 mr-5 group-hover:bg-emerald-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <div className="">
              <span className="mb-1">Add song to playlist </span>
              <form onSubmit={handeAddSong}>
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
                <button></button>
              </form>
              {errors ? errors.errors.map((e) => <li>{e}</li>) : null}
            </div>
          </div>

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
