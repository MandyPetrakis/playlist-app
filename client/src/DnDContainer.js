import update from "immutability-helper";
import { useCallback, useState } from "react";
import { DnDCard } from "./DnDCard";
import { useCards } from "./Context";

export function DnDContainer({ cardRender, canRemove, setPlaylist, playlist }) {
  const [wasMoved, setWasMoved] = useState(false);
  const [cards, setCards] = useCards();

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
    setWasMoved(true);
  }, []);

  function handleSave() {
    cards.forEach((c, index) => {
      let song = playlist.playlist_songs.find(({ id }) => id === c.id);
      let order = index + 1;

      if (song.order === order) return;
      else {
        let update = { order: order, user_id: c.user_id };

        fetch(`/playlist_songs/${song.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
        }).then((r) => r.json());
      }
    });

    setWasMoved(false);
  }

  const renderCard = useCallback((card, index) => {
    return (
      <DnDCard
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        cardRender={cardRender}
        moveCard={moveCard}
        canRemove={canRemove}
        setPlaylist={setPlaylist}
      />
    );
  }, []);

  return (
    <div className={`${wasMoved ? "pt-0 grid mb-10" : "pt-10 grid mb-10"}`}>
      {wasMoved ? (
        <button
          className="bg-emerald-400 py-2 px-4 rounded w-40 place-self-center"
          onClick={handleSave}
        >
          Save Order
        </button>
      ) : null}
      <div className="w-400">{cards.map((card, i) => renderCard(card, i))}</div>
    </div>
  );
}
