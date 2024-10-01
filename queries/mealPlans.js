"use server";

import { User } from "@/model/UserModel";
import { MealPlan } from "@/model/MealPlan";
import { auth } from "@/auth";

export async function getMealPlan() {
  const session = await auth();
  const currentUser = await User.findOne({ email: session?.user.email });
  const existingMealPlanId = currentUser.mealPlan;
  if (existingMealPlanId) {
    const mealPlan = await MealPlan.findById(existingMealPlanId);
    return mealPlan.mealPlan;
  }
}

export async function addMealPlan(mealPlanToAdd) {
  const session = await auth();
  const { mealPlan } = mealPlanToAdd;
  try {
    const currentUser = await User.findOne({ email: session?.user.email });
    const existingMealPlanId = currentUser.mealPlan;
    // Update planned recipes
    if (existingMealPlanId) {
      const updatedMealPlan = await MealPlan.findByIdAndUpdate(
        existingMealPlanId,
        { mealPlan: mealPlan },
        { new: true }
      );
      console.log("Meal Plan updated:", updatedMealPlan);
    } else {
      // Add planned recipes
      const newMealPlan = await MealPlan.create(mealPlanToAdd);
      const updatedUser = await User.findOneAndUpdate(
        { email: session?.user.email }, // Find user by email
        { mealPlan: newMealPlan._id }, // Add the planned recipe ID to the user
        { new: true } // Return the updated user document
      );
      console.log("User updated with new meal plan:", updatedUser);
    }
  } catch (e) {
    throw new Error(e);
  }
}
