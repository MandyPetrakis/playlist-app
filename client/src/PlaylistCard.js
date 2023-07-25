import { useState } from "react";

export default function PlaylistCard({ playlist, setCurrentPlaylist }) {
  return (
    <div
      className="playlist-card-wrapper"
      onClick={() => setCurrentPlaylist(playlist)}
    >
      Title: {playlist.title} <br />
      Mood: {playlist.mood} <br />
    </div>
  );
}
