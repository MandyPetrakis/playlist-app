import { useCurrentUser, useSongs, useCards } from "./Context";
import SongCard from "./SongCard";
import { DnDContainer } from "./DnDContainer";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import PlaylistSongCard from "./PlaylistSongCard";

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

  function cardRender(playlist) {
    setCards(
      playlist.playlist_songs.map((s) => ({
        id: s.id,
        text: s,
      }))
    );
  }

  useEffect(() => {
    cardRender(playlist);
  }, []);

  const songSuggestions = songs
    .slice(0, 14)
    .map((s) => (
      <SongCard
        key={s.id}
        song={s}
        playlist={playlist}
        setPlaylist={setPlaylist}
        cardRender={cardRender}
        canRemove={canRemove}
      />
    ));

  return (
    <>
      <div className="flex">
        <span className="text-3xl uppercase">{playlist.title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 ml-10"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM15.375 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="mb-3 font-extralight">
        {currentPlaylist.username} | {currentPlaylist.playlist_songs.length}{" "}
        songs
      </div>
      <DnDContainer
        cardRender={cardRender}
        canRemove={canRemove}
        setPlaylist={setPlaylist}
      />
      {currentUser.id === playlist.user_id ? (
        <>
          <div className=" text-md font-bold">Recommended</div>
          <div className="text-xs font-light mb-3">
            Based on what's in this playlist
          </div>
          {songSuggestions}
        </>
      ) : null}
    </>
  );
}
