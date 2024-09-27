import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Rating } from "@mui/material";
import Draggable from "../dnd/Draggable";
import Image from "next/image";

export default function RecipeCard({
  recipe,
  onOpen,
  setActiveRecipe,
  setPendingModalOpen,
}) {
  return (
    <Card
      onPress={() => {
        onOpen();
        setActiveRecipe(recipe);
        setPendingModalOpen(true);
      }}
      isPressable={true}
      className="p-0"
    >
      <CardBody>
        <Image
          width="480"
          height="360"
          alt={recipe.name}
          className="w-full object-cover h-[110px] z-50"
          src={"https://img.spoonacular.com/recipes/716429-480x360.jpg"}
        />
        <div>{recipe.name}</div>
        <div className="text-gray-400">Full Belly Sisters</div>
        <div className="flex items-center">
          <Rating
            name="half-rating-read"
            defaultValue={3.7}
            precision={0.1}
            readOnly
          />
          <div className="text-sm text-black">2k</div>
        </div>
      </CardBody>
    </Card>
  );
}
