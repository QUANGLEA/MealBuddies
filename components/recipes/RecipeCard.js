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
      shadow="none"
      radius="sm"
      onPress={() => {
        onOpen();
        setActiveRecipe(recipe);
        setPendingModalOpen(true);
      }}
      isPressable={true}
      className="flex flex-col justify-center items-center bg-goldenSand mr-3 w-1/5"
    >
      <CardBody className="overflow-visible p-0">
        <Image
          width="156"
          height="115"
          alt={recipe.name}
          className="w-full h-[150px] object-cover z-50"
          src={recipe.image}
        />
        <p className="font-bold">{recipe.name}</p>
        <p className="text-gray-400">{recipe.author}</p>
        <Rating
          name="half-rating-read"
          defaultValue={recipe.rating}
          precision={0.1}
          readOnly
          className="mr-2"
        />
      </CardBody>
    </Card>
  );
}
