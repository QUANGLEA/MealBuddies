import { addPlannedRecipes } from "@/queries/plannedRecipes";
import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { recipes } = await request.json();

    await dbConnect();
    await addPlannedRecipes({ recipes });

    return new NextResponse("Planned recipes have been added", { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
