import { createPreferences } from "@/queries/preferences";
import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { preferences } = await request.json();
  const { cuisines, allergies, diets, ingredients } = preferences;

  // Create DB connection
  await dbConnect();

  // Create preferences payload
  const newPreferences = {
    cuisines,
    diets,
    allergies,
    ingredients,
  };

  // Update db
  try {
    await createPreferences(newPreferences);
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, {
      status: 500,
    });
  }

  // Add user info to DB
  return new NextResponse("Preferences has been has been created", {
    status: 200,
  });
};
