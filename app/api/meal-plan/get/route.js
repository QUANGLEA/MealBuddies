import { getMealPlan } from "@/queries/mealPlans";
import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const mealPlan = await getMealPlan();
    return new NextResponse(JSON.stringify({ mealPlan }));
  } catch (e) {
    console.log(e);
    return new NextResponse(e.message, { status: 500 });
  }
};
