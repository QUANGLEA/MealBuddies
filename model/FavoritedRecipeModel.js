import mongoose, { Schema } from "mongoose";

const favoritedRecipeSchema = new Schema({
  recipes: {
    type: [Object],
    default: [],
  },
});

export const FavoritedRecipe =
  mongoose.models.FavoritedRecipe ??
  mongoose.model("FavoritedRecipe", favoritedRecipeSchema);
