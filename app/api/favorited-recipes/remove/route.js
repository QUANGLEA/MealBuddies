import { removeFavoritedRecipe } from "@/queries/favoritedRecipes";
import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { recipeId } = await request.json();
    await dbConnect();
    await removeFavoritedRecipe(recipeId);

    return new NextResponse("Favorited recipe have been added", {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
