import update from "immutability-helper";
import { useCallback, useState } from "react";
import { DnDCard } from "./DnDCard";
import { useCards } from "./Context";

export function DnDContainer({ cardRender, canRemove, setPlaylist }) {
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
    <>
      {wasMoved ? <button onClick={handleSave}>Save Order</button> : null}
      <div className="w-400">{cards.map((card, i) => renderCard(card, i))}</div>
    </>
  );
}
