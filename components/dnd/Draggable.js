import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function Draggable({ children, id, recipe }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      recipe: recipe,
    },
  });
  const style = {
    height: "100%",
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
