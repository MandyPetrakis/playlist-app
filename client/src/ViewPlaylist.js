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
  const [showMenu, setShowMenu] = useState(false);
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
