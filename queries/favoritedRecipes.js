"use server";

import { User } from "@/model/UserModel";
import { FavoritedRecipe } from "@/model/FavoritedRecipeModel";
import { auth } from "@/auth";

export async function getFavoritedRecipes() {
  const session = await auth();
  const currentUser = await User.findOne({ email: session?.user.email });
  const existingFavoritedRecipesId = currentUser.favoritedRecipe;
  if (existingFavoritedRecipesId) {
    const favoritedRecipes = await FavoritedRecipe.findById(
      existingFavoritedRecipesId
    );
    return favoritedRecipes.recipes;
  }
}

export async function addFavoritedRecipe(favoritedRecipe) {
  const session = await auth();
  const { recipe } = favoritedRecipe;
  try {
    const currentUser = await User.findOne({ email: session?.user.email });
    const existingFavoritedRecipesId = currentUser.favoritedRecipe;
    // Update planned recipes
    if (existingFavoritedRecipesId) {
      const updatedFavoritedRecipes = await FavoritedRecipe.findByIdAndUpdate(
        existingFavoritedRecipesId,
        { $push: { recipes: recipe } },
        { new: true, useFindAndModify: false }
      );
      console.log("Favorited Recipes added", updatedFavoritedRecipes);
    } else {
      // Create a new FavoritedRecipe document with the recipe in the array
      const newFavoritedRecipes = await FavoritedRecipe.create({
        recipes: [recipe],
      });

      // Update the user with the new FavoritedRecipe ID
      const updatedUser = await User.findOneAndUpdate(
        { email: session?.user.email },
        { favoritedRecipe: newFavoritedRecipes._id },
        { new: true }
      );
      console.log("User updated with new favorited recipes:", updatedUser);
    }
  } catch (e) {
    throw new Error(e);
  }
}

export async function removeFavoritedRecipe(recipeId) {
  const session = await auth();

  try {
    const currentUser = await User.findOne({ email: session?.user.email });
    const existingFavoritedRecipesId = currentUser.favoritedRecipe;

    // Check if the user has an existing favorited recipes list
    if (existingFavoritedRecipesId) {
      const favoritedRecipeDoc = await FavoritedRecipe.findById(
        existingFavoritedRecipesId
      );

      // Check if the recipes array exists and is not empty
      if (favoritedRecipeDoc?.recipes?.length > 0) {
        // Perform the removal using $pull
        const updatedFavoritedRecipes = await FavoritedRecipe.findByIdAndUpdate(
          existingFavoritedRecipesId,
          { $pull: { recipes: { id: recipeId } } }, // Remove recipe with the matching id
          { new: true, useFindAndModify: false }
        );

        console.log("Recipe removed:", updatedFavoritedRecipes);
      } else {
        console.log("No recipes found to remove.");
      }
    } else {
      console.log("User has no favorited recipes list.");
    }
  } catch (e) {
    throw new Error(e);
  }
}
