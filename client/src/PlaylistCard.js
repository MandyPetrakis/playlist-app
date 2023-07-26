import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentPlaylist } from "./Context";

export default function PlaylistCard({ playlist }) {
  const [currentPlaylist, setCurrentPlaylist] = useCurrentPlaylist();

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/playlist`;
    navigate(path);
  };

  return (
    <div
      className="playlist-card-wrapper"
      onClick={() => {
        setCurrentPlaylist(playlist);
        routeChange();
      }}
    >
      Title: {playlist.title} <br />
      Mood: {playlist.mood} <br />
    </div>
  );
}
