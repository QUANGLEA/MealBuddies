import { getFavoritedRecipes } from "@/queries/favoritedRecipes";
import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const favoritedRecipes = await getFavoritedRecipes();
    return new NextResponse(JSON.stringify({ favoritedRecipes }));
  } catch (e) {
    console.log(e);
    return new NextResponse(e.message, { status: 500 });
  }
};
