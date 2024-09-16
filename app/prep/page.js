export default function Prep() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div>Based on your preferences</div>
      <div>Here are our recipe recommendations:</div>
    </div>
  );
}

const dummyData = {
  cuisines: ["Asian", "Vietnamese", "Chinese"],
  diets: [],
  allergies: [],
  excludeIngredients: [],
};
