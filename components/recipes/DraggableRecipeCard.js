export default function DraggableRecipeCard({ recipe }) {
  return (
    <div className="h-full bg-sageGreen rounded p-1 text-sm flex flex-col items-center justify-center text-black">
      <p>{recipe.name}</p>
    </div>
  );
}
