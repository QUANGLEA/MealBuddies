import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  preference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Preference",
    default: null,
  },
  plannedRecipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlannedRecipe",
    default: null,
  },
  mealPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MealPlan",
    default: null,
  },
  favoritedRecipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FavoritedRecipe",
    default: null,
  },
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
