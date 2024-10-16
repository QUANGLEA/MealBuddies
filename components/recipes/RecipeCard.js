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
      className="flex flex-shrink-0 flex-col justify-center items-center bg-lightGoldenSand mr-3 w-1/5"
    >
      <CardBody className="overflow-visible">
        <Image
          width="156"
          height="120"
          alt={recipe.name}
          className="w-full h-[120px] object-cover z-50 mb-4"
          src={recipe.image}
        />
        <p className="font-bold">
          {recipe.name.split(" ").slice(0, 10).join(" ")}
        </p>
        <p className="text-gray-600 text-small">{recipe.author}</p>
      </CardBody>
    </Card>
  );
}
