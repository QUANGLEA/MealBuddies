import mongoose, { Schema } from "mongoose";

const plannedRecipeSchema = new Schema({
  recipes: {
    type: [Object],
  },
});

export const PlannedRecipe =
  mongoose.models.PlannedRecipe ??
  mongoose.model("PlannedRecipe", plannedRecipeSchema);
