export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const SUGGESTED_RECIPES_DROPPABLE_ID = "suggested recipes";

export const WEEK_PLAN_ID_DELIMITER = ".";

export const MEALS = ["Breakfast", "Lunch", "Dinner"];

export const getRecipeById = (recipes, id) => {
  return recipes.find((recipe) => recipe.id == id);
};

export const findContainerId = (weekPlan, id) => {
  if (id == null) return null;
  if (id.includes(WEEK_PLAN_ID_DELIMITER)) {
    return id;
  }

  for (const day of DAYS) {
    for (const meal of MEALS) {
      if (weekPlan[day][meal] == null) continue;
      if (id == weekPlan[day][meal]["id"]) {
        return day + WEEK_PLAN_ID_DELIMITER + meal;
      }
    }
  }

  return null;
};
