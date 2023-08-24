import { useNavigate } from "react-router-dom";

export default function PlaylistCard({ playlist, hideUser }) {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/${playlist.id}`;
    navigate(path);
  };

  const defaultImage = (
    <img
      className="rounded w-36 h-36 mb-1"
      src="https://e1.pxfuel.com/desktop-wallpaper/389/930/desktop-wallpaper-spotify-playlist-cover-playlist-covers.jpg"
      alt="playlist cover"
    />
  );

  const playlistDetails = (
    <>
      <div className="uppercase font-semibold w-36 whitespace-nowrap text-ellipsis overflow-hidden">
        {playlist.title} <br />
      </div>
      <div className="text-sm font-light">
        <span className="text-emerald-300">mood</span> - {playlist.mood}
      </div>
      {hideUser ? null : (
        <div className="text-sm font-ligh"> by {playlist.username}</div>
      )}
    </>
  );

  const playSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="bg-emerald-500 rounded-full w-10 p-2 opacity-0 group-hover:opacity-100 relative bottom-28 left-24 transition-opacity"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
      />
    </svg>
  );

  return (
    <div
      className="rounded bg-zinc-900 hover:bg-zinc-800 m-4 p-4 h-64 grow-0 text-ellipsis transition-colors group cursor-pointer"
      onClick={() => {
        routeChange();
      }}
    >
      {playlist.image ? (
        <img
          className="rounded w-36 h-36 mb-1"
          src={playlist.image}
          alt="playlist cover"
        />
      ) : (
        defaultImage
      )}
      {playlistDetails}
      {playSVG}
    </div>
  );
}
