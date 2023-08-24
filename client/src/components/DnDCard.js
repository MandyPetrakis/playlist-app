import { useRef } from "react";
import PlaylistSongCard from "./PlaylistSongCard.js";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes.js";

export const DnDCard = ({
  id,
  text,
  index,
  moveCard,
  canRemove,
  setPlaylist,
  cardRender,
}) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.SONG,

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SONG,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={
        isDragging
          ? "opacity-0 p-1 my-1 cursor-ns-resize"
          : "opacity-1 p-1 my-1 cursor-ns-resize"
      }
      ref={ref}
      data-handler-id={handlerId}
    >
      <PlaylistSongCard
        playlist_song={text}
        canRemove={canRemove}
        setPlaylist={setPlaylist}
        cardRender={cardRender}
        index={index}
      />
    </div>
  );
};
