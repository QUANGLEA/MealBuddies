import { getUserPreferences } from "@/queries/preferences";
import { NextResponse } from "next/server";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const GET = async () => {
  try {
    const { cuisines, diets, allergies, ingredients } =
      await getUserPreferences();
    const cuisinesParam = cuisines.join(",");
    const dietsParam = diets.join(",");
    const allergiesParam = allergies.join(",");
    const ingredientsParam = ingredients.join(",");
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?number=7&addRecipeInformation=true&fillIngredients=true&addRecipeNutrition=true&cuisine=${cuisinesParam}&diet=${dietsParam}&intolerances=${allergiesParam}&includeIngredients=${ingredientsParam}&apiKey=${apiKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch suggested recipes from Spoonacular API");
    }

    const json = await response.json();
    const recipes = json.results;
    console.log(recipes);
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
