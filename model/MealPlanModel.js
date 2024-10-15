import mongoose, { Schema } from "mongoose";

const mealPlanSchema = new Schema({
  mealPlan: {
    type: Object,
  },
});

export const MealPlan =
  mongoose.models.MealPlan ?? mongoose.model("MealPlan", mealPlanSchema);
