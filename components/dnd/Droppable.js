import { useDroppable } from "@dnd-kit/core";

export default function Droppable({ children, id }) {
  const { isOver, setNodeRef } = useDroppable({ id: id });

  const style = {
    height: "100%",
    opacity: isOver ? 0.5 : 1,
  };

  return (
    <div style={style} ref={setNodeRef}>
      {children}
    </div>
  );
}
