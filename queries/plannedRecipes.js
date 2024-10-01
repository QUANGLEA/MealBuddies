"use server";

import { User } from "@/model/UserModel";
import { PlannedRecipe } from "@/model/PlannedRecipeModel";
import { auth } from "@/auth";

export async function getPlannedRecipes() {
  const session = await auth();
  const currentUser = await User.findOne({ email: session?.user.email });
  const existingPlannedRecipesId = currentUser.plannedRecipe;
  if (existingPlannedRecipesId) {
    const plannedRecipes = await PlannedRecipe.findById(
      existingPlannedRecipesId
    );
    return plannedRecipes.recipes;
  }
}

export async function addPlannedRecipes(plannedRecipes) {
  const session = await auth();
  const { recipes } = plannedRecipes;
  try {
    const currentUser = await User.findOne({ email: session?.user.email });
    const existingPlannedRecipesId = currentUser.plannedRecipe;
    // Update planned recipes
    if (existingPlannedRecipesId) {
      const updatedPlannedRecipes = await PlannedRecipe.findByIdAndUpdate(
        existingPlannedRecipesId,
        { recipes: recipes },
        { new: true }
      );
      console.log("Planned Recipes updated", updatedPlannedRecipes);
    } else {
      // Add planned recipes
      const newPlannedRecipes = await PlannedRecipe.create(plannedRecipes);
      const updatedUser = await User.findOneAndUpdate(
        { email: session?.user.email }, // Find user by email
        { plannedRecipe: newPlannedRecipes._id }, // Add the planned recipe ID to the user
        { new: true } // Return the updated user document
      );
      console.log("User updated with new planned recipes:", updatedUser);
    }
  } catch (e) {
    throw new Error(e);
  }
}
