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
  const [isFavorited, setIsFavorited] = useState(recipe.isFavorited);
  const [isSaved, setIsSaved] = useState(recipe.isSaved);
  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };
  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };
  return (
    <Card className="flex flex-col items-center h-full w-full shadow-2xl rounded-xl space-y-2 bg-transparent">
      <Image
        src={recipe.image}
        alt={recipe.title}
        height={150}
        width={150}
        className="w-full"
      />
      <CardBody>
        <div className="flex w-full justify-between items-center px-3">
          <Rating defaultValue={4} />
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
          <p className="text-lg font-bold">
            Fried rice with pineapple and soy sauce
          </p>
          <p className="text-sm text-gray-500">Full Belly Sisters</p>
        </div>
      </CardBody>
    </Card>
  );
}
