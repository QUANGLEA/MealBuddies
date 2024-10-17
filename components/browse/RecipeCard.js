import { useState } from "react";
import Image from "next/image";
import { Rating } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function RecipeCard({ recipe }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = async () => {
    setIsFavorited(!isFavorited);
    try {
      let response;
      if (!isFavorited) {
        response = await fetch("/api/favorited-recipes/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipe: recipe,
          }),
        });
      } else {
        response = await fetch("/api/favorited-recipes/remove", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipeId: recipe.id,
          }),
        });
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Favorited recipe updated successfully:", response);
    } catch (e) {
      console.error("Error updating favorited recipes:", e);
    }
  };

  return (
    <Card className="flex flex-col items-center h-full w-full shadow-2xl rounded-xl space-y-2 bg-transparent">
      <Image
        src={recipe.image}
        alt={recipe.title}
        height={150}
        width={150}
        className="w-full rounded-xl"
      />
      <CardBody>
        <div className="flex w-full justify-between items-center px-3">
          <Rating defaultValue={recipe.rating} precision={0.1} readOnly />
          <motion.button
            onClick={handleFavoriteClick}
            className="focus:outline-none"
            whileTap={{ scale: 1.3 }} // Popping animation on tap
          >
            {isFavorited ? (
              // Filled heart icon when favorited
              <motion.div
                className="w-7 h-7 text-coralSunset"
                animate={{ scale: 1 }} // Slightly enlarge when filled
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FavoriteIcon className="w-full h-full" />
              </motion.div>
            ) : (
              // Outlined heart icon when not favorited
              <motion.div
                className="w-7 h-7 text-gray-500"
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FavoriteBorderOutlinedIcon className="w-full h-full" />
              </motion.div>
            )}
          </motion.button>
        </div>

        <div className="p-4 rounded-xl flex flex-col space-y-2">
          <p className="text-lg font-bold">{recipe.name}</p>
          <p className="text-sm text-gray-600">{recipe.author}</p>
        </div>
      </CardBody>
    </Card>
  );
}
