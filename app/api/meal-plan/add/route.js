import { addMealPlan } from "@/queries/mealPlans";
import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { mealPlan } = await request.json();
    await dbConnect();
    await addMealPlan({ mealPlan });

    return new NextResponse("Meal plan have been added", { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
