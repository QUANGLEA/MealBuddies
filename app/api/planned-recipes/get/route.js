import { getPlannedRecipes } from "@/queries/plannedRecipes";
import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const plannedRecipes = await getPlannedRecipes();
    return new NextResponse(JSON.stringify({ plannedRecipes }));
  } catch (e) {
    console.log(e);
    return new NextResponse(e.message, {
      status: 500,
    });
  }
};
