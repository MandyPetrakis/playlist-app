import { useState } from "react";
import PlaylistCard from "./PlaylistCard";

export default function Playlists() {
  const [userPlaylists, setUserPlaylist] = useState();
  return (
    <>
      <div>Your Playlists</div>
      <PlaylistCard />
    </>
  );
}
