"use server";

import { Preference } from "@/model/PreferenceModel";
import { User } from "@/model/UserModel";
import { auth } from "@/auth";

export async function createPreferences(preferencesData) {
  const session = await auth();
  try {
    const newPreferences = await Preference.create(preferencesData);
    const updatedUser = await User.findOneAndUpdate(
      { email: session?.user.email }, // Find user by email
      { preference: newPreferences._id }, // Add the preference ID to the user
      { new: true } // Return the updated user document
    );
    console.log("User updated with new preference:", updatedUser);
  } catch (e) {
    throw new Error(e);
  }
}

export async function updatePreferences(preferenceData) {
  // TODO: Implement an endpoint to update
}
