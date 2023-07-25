import PlaylistCard from "./PlaylistCard";
import PlaylistSongs from "./PlaylistSongs";
import { usePlaylists, useCurrentUser } from "./Context";
import { useState } from "react";

export default function Playlists() {
  const [playlists, setPlaylists] = usePlaylists();
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [currentPlaylist, setCurrentPlaylist] = useState();

  const userPlaylists = playlists
    .filter((p) => p.user_id === currentUser.id)
    .map((p) => (
      <PlaylistCard
        key={p.id}
        setCurrentPlaylist={setCurrentPlaylist}
        playlist={p}
      />
    ));

  const allPlaylists = playlists.map((p) => (
    <PlaylistCard
      key={p.id}
      setCurrentPlaylist={setCurrentPlaylist}
      playlist={p}
    />
  ));

  return (
    <div className="flex-row">
      <div className="playlists-list-wrapper">
        Your Playlists
        {userPlaylists.length === 0 ? (
          <>
            <div>Start Creating</div>
            or
            <div>Explore</div>
          </>
        ) : (
          userPlaylists
        )}
      </div>
      <div className="flex-column">
        {currentPlaylist ? <PlaylistSongs playlist={currentPlaylist} /> : null}
      </div>
    </div>
  );
}
