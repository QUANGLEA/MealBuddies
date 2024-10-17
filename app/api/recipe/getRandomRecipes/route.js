import { getUserPreferences } from "@/queries/preferences";
import { NextResponse } from "next/server";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const GET = async () => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch random recipes from Spoonacular API");
    }

    const json = await response.json();
    const recipes = json.recipes;
    const compactedRecipes = recipes.map((recipe) => {
      return {
        id: recipe.id,
        author: recipe.sourceName,
        name: recipe.title,
        readyInMinutes: recipe.readyInMinutes,
        image: recipe.image,
        summary: recipe.summary,
        ingredients: recipe.extendedIngredients,
        servings: recipe.servings,
        rating:
          Math.round((Math.round(recipe.spoonacularScore) / 20) * 10) / 10,
      };
    });

    return new NextResponse(JSON.stringify(compactedRecipes));
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
