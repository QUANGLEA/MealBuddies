"use client";

import { useState, useEffect } from "react";
import { Menu, X, Home, Book, ShoppingCart, Settings } from "lucide-react";
import RecipeCard from "@/components/recipes/RecipeCard";
import { DndContext } from "@dnd-kit/core";
import Droppable from "@/components/dnd/Droppable";
import Draggable from "@/components/dnd/Draggable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  MEALS,
  DAYS,
  WEEK_PLAN_ID_DELIMITER,
  findContainerId,
} from "@/utils/dnd";
import {
  CardFooter,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import MenuPlanModalDropdown from "@/components/dropdown/MenuPlanModalDropdown";
import DraggableRecipeCard from "@/components/recipes/DraggableRecipeCard";
import Image from "next/image";
import { Rating } from "@mui/material";
import DOMPurify from "dompurify";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import AisleIcon from "@mui/icons-material/Reorder";
import RecipeIcon from "@mui/icons-material/ListAlt";
import CloseIcon from "@mui/icons-material/Close";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const ShoppingListOptions = Object.freeze({
  EMPTY: 0,
  SUGGEST: 1,
  RECIPE: 2,
  AISLE: 3,
});

const getEarliestFreeDay = (weekPlan) => {
  for (let day of DAYS) {
    for (let meal of MEALS) {
      if (!weekPlan[day][meal]) {
        return day;
      }
    }
  }
  return "";
};

const getEarliestFreeMeal = (weekPlan, day) => {
  console.log(day);
  for (let meal of MEALS) {
    if (!weekPlan[day][meal]) {
      return meal;
    }
  }
  return "";
};

const getFullyOccupiedDays = (weekPlan) => {
  const fullyOccupiedDays = [];

  // Iterate over each day in weekPlan
  for (let day of DAYS) {
    let allMealsUsed = true;

    // Check if all meals for that day are planned (not null)
    for (let meal of MEALS) {
      if (!weekPlan[day][meal]) {
        allMealsUsed = false;
        break; // Exit loop early if any meal is not planned
      }
    }

    // If all meals are planned for this day, add the day to the list
    if (allMealsUsed) {
      fullyOccupiedDays.push(day);
    }
  }

  return fullyOccupiedDays;
};

const getOccupiedMeals = (weekPlan, day) => {
  const occupiedMeals = [];

  // Iterate over each meal (e.g., breakfast, lunch, dinner)
  for (let meal of MEALS) {
    if (weekPlan[day][meal]) {
      occupiedMeals.push(meal); // Add meal to list if it is occupied
    }
  }

  return occupiedMeals;
};

export default function Prep() {
  // Miscellaneous
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Modals
  const recipeModalConfig = useDisclosure();
  const mealPlanModalConfig = useDisclosure();
  const [pendingModalOpen, setPendingModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayMealDropdown, setDisplayMealDropdown] = useState(false);

  // Shopping List
  const [shoppingListByRecipe, setShoppingListByRecipe] = useState([]);
  const [shoppingListByAisle, setShoppingListByAisle] = useState([]);
  const [isFirstSuggestion, setIsFirstSuggestion] = useState(false);
  const [loadingShoppingList, setLoadingShoppingList] = useState(true);
  const [shoppingListOption, setShoppingListOption] = useState(
    ShoppingListOptions.EMPTY
  );

  // Suggested Recipes
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [loadingSuggestedRecipes, setLoadingSuggestedRecipes] = useState(true);
  const [suggestedRecipes, setSuggestedRecipes] = useState([
    {
      id: 716426,
      author: "Full Belly Sisters",
      name: "Fried Rice",
      readyInMinutes: 30,
      image: "https://img.spoonacular.com/recipes/716426-312x231.jpg",
      summary: "",
      ingredients: [
        {
          aisle: "Milk, Eggs, Other Dairy",
          amount: 1.0,
          consistency: "solid",
          id: 1001,
          image: "butter-sliced.jpg",
          measures: {
            metric: {
              amount: 1.0,
              unitLong: "Tbsp",
              unitShort: "Tbsp",
            },
            us: {
              amount: 1.0,
              unitLong: "Tbsp",
              unitShort: "Tbsp",
            },
          },
          meta: [],
          name: "butter"
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" "),
          original: "1 tbsp butter",
          originalName: "butter",
          unit: "tbsp",
        },
      ],
      servings: 4,
      rating: 4.7,
      calories: 580,
    },
  ]);

  // Week Plan
  const [mealPlan, setMealPlan] = useState([]); // [{ day, meal }] each index is a serving
  const [currentServing, setCurrentServing] = useState(0);
  const [currentDay, setCurrentDay] = useState("Monday");
  const [weekPlan, setWeekPlan] = useState(
    // {Monday: { Breakfast: null, Lunch: null, Dinner: null }, etc...}
    DAYS.reduce((acc, day) => {
      acc[day] = MEALS.reduce((mealAcc, meal) => {
        mealAcc[meal] = null;
        return mealAcc;
      }, {});
      return acc;
    }, {})
  );

  useEffect(() => {
    const getSuggestedRecipes = async () => {
      try {
        /* const response = await fetch("/api/recipe/getSuggestedRecipes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setSuggestedRecipes(result); */
      } catch (e) {
        console.log(e);
      } finally {
        setLoadingSuggestedRecipes(false);
      }
    };

    const getPlannedRecipes = async () => {
      try {
        const res = await fetch("/api/planned-recipes/get");
        const { plannedRecipes } = await res.json();

        if (plannedRecipes) {
          setShoppingListOption(ShoppingListOptions.RECIPE);
          setShoppingListByRecipe(plannedRecipes);
          convertByRecipeToByAisle(plannedRecipes);
          setIsFirstSuggestion(true);
        }
        setLoadingShoppingList(false);
      } catch (e) {
        console.log(e);
      }
    };

    const getMealPlan = async () => {
      try {
        const res = await fetch("/api/meal-plan/get");
        const { mealPlan } = await res.json();
        if (mealPlan) {
          setCurrentDay(getEarliestFreeDay(mealPlan));
          setWeekPlan(mealPlan);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getMealPlan();
    getSuggestedRecipes();
    getPlannedRecipes();
  }, []);

  useEffect(() => {
    if (pendingModalOpen && activeRecipe) {
      // [ { day: "Monday", meal: "Breakfast" }, etc...]
      setMealPlan(
        Array.from({ length: activeRecipe.servings }, () => ({
          day: DAYS[0],
          meal: MEALS[0],
        }))
      );
      setIsModalOpen(true);
      setPendingModalOpen(false); // Reset pending state
    }

    if (shoppingListByRecipe.length == 0) {
      setShoppingListOption(ShoppingListOptions.EMPTY);
    } else if (shoppingListByRecipe != 0 && !isFirstSuggestion) {
      setShoppingListOption(ShoppingListOptions.SUGGEST);
      setIsFirstSuggestion(true);
    }
  }, [activeRecipe, pendingModalOpen, shoppingListByRecipe, isFirstSuggestion]);

  useEffect(() => {
    setDisplayMealDropdown(true);
  }, [currentServing]);

  const convertByRecipeToByAisle = (listByRecipe) => {
    const listByAisle = [];

    listByRecipe.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        // Find if the aisle already exists in the grocery list
        let aisleEntry = listByAisle.find(
          (aisle) => aisle.name === ingredient.aisle
        );

        // If the aisle does not exist, create a new one
        if (!aisleEntry) {
          aisleEntry = { name: ingredient.aisle, ingredients: [] };
          listByAisle.push(aisleEntry);
        }

        // Find if the ingredient already exists in the aisle by name (but keep units separate)
        let ingredientEntry = aisleEntry.ingredients.find(
          (item) =>
            item.name === ingredient.name && item.unit === ingredient.unit
        );

        // If the same ingredient with the same unit exists, accumulate the amount
        if (ingredientEntry) {
          ingredientEntry.amount += ingredient.amount;
        } else {
          // Otherwise, add it as a new entry with its specific unit
          aisleEntry.ingredients.push({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
            isBought: ingredient.isBought,
          });
        }
      });
    });

    setShoppingListByAisle(listByAisle);
  };

  const handleMealPlanChange = (key, value) => {
    const updatedMealPlan = [...mealPlan];
    const updatedMeal = { ...updatedMealPlan[currentServing] };
    updatedMeal[key] = value;
    updatedMealPlan[currentServing] = updatedMeal;
    setMealPlan(updatedMealPlan);
  };

  const handleAddToMealPlan = async () => {
    // Step 1: Create updatedRecipe with `isBought: false`
    const updatedRecipe = {
      ...activeRecipe,
      ingredients: activeRecipe.ingredients.map((ingredient) => ({
        ...ingredient,
        isBought: false,
      })),
    };

    // Step 2: Update the shopping list and add the recipe to the DB
    const newShoppingList = [...shoppingListByRecipe, updatedRecipe];

    // Convert recipes by aisle
    convertByRecipeToByAisle(newShoppingList);

    // Await the database operation for saving the shopping list
    await addPlannedRecipesToDB(newShoppingList);

    // Update the shopping list state
    setShoppingListByRecipe(newShoppingList);

    // Step 3: Update the week plan for each meal and day
    let updatedWeekPlan = { ...weekPlan }; // Clone weekPlan before updating
    mealPlan.forEach((serving, i) => {
      const day = serving.day;
      const meal = serving.meal;

      // Create a modified version of the active recipe for this meal
      const recipe = {
        ...updatedRecipe, // Use updatedRecipe directly here
        id: updatedRecipe.id + "-" + i, // Update the ID for the meal
      };

      // Update the week plan using addRecipeToWeekPlanSync
      updatedWeekPlan = addRecipeToWeekPlanSync(
        updatedWeekPlan,
        recipe,
        day,
        meal
      );
    });

    // Step 4: Await the database operation for saving the meal plan
    await addMealPlanToDB(updatedWeekPlan);

    // Step 5: Change the week plan
    setWeekPlan(updatedWeekPlan);
  };

  // --------- HELPER FUNCTION ------------------->
  const addRecipeToWeekPlanSync = (weekPlanRef, recipe, day, meal) => {
    const updatedWeekPlan = {
      ...weekPlanRef,
      [day]: {
        ...weekPlanRef[day],
        [meal]: recipe,
      },
    };
    return updatedWeekPlan;
  };

  const countNumUnboughtIngredients = (ingredients) => {
    let numUnboughtIngredients = 0;
    ingredients.forEach((ingredient) => {
      if (!ingredient.isBought) {
        numUnboughtIngredients += 1;
      }
    });
    return numUnboughtIngredients;
  };

  const addMealPlanToDB = async (mealPlanToAdd) => {
    try {
      const response = await fetch("/api/meal-plan/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mealPlan: mealPlanToAdd }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (e) {
      console.error("Error updating meal plan:", e);
    }
  };

  const addPlannedRecipesToDB = async (recipes) => {
    try {
      const response = await fetch("/api/planned-recipes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipes: recipes }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (e) {
      console.error("Error updating planned recipes:", e);
    }
  };

  const toggleBoughtIngredientList = async (name, unit) => {
    const updatedShoppingListByRecipe = shoppingListByRecipe.map((recipe) => {
      return {
        ...recipe,
        ingredients: recipe.ingredients.map((ingredient) => {
          if (ingredient.name === name && ingredient.unit === unit) {
            return {
              ...ingredient,
              isBought: !ingredient.isBought,
            };
          }
          return ingredient;
        }),
      };
    });

    // Update the state with the new shopping list
    setShoppingListByRecipe(updatedShoppingListByRecipe);

    setShoppingListByAisle((shoppingListByAisle) =>
      shoppingListByAisle.map((aisle) => ({
        ...aisle,
        ingredients: aisle.ingredients.map((ingredient) => {
          if (ingredient.name == name && ingredient.unit == unit) {
            return {
              ...ingredient,
              isBought: !ingredient.isBought,
            };
          }
          return ingredient;
        }),
      }))
    );

    // Call the async function to handle the updated list
    await addPlannedRecipesToDB(updatedShoppingListByRecipe);
  };

  const removeRecipeFromWeekPlan = (day, meal) => {
    setWeekPlan((weekPlan) => {
      return {
        ...weekPlan,
        [day]: {
          ...weekPlan[day],
          [meal]: null,
        },
      };
    });
  };
  // --------- HELPER FUNCTION ------------------->
  const onDragEnd = async ({ active, over }) => {
    const activeContainerId = findContainerId(weekPlan, active.id);
    const overContainerId = findContainerId(weekPlan, over?.id);

    if (
      !activeContainerId ||
      !overContainerId ||
      activeContainerId === overContainerId
    ) {
      return;
    }

    // Use a promise with setWeekPlan to ensure we get the updated state
    await new Promise((resolve) => {
      setWeekPlan((weekPlan) => {
        const [activeDay, activeMeal] = activeContainerId.split(
          WEEK_PLAN_ID_DELIMITER
        );
        const [overDay, overMeal] = overContainerId.split(
          WEEK_PLAN_ID_DELIMITER
        );

        const recipeActive = weekPlan[activeDay][activeMeal];
        const recipeOver = weekPlan[overDay][overMeal];

        let updatedWeekPlan;

        // Swap recipes
        if (activeDay === overDay) {
          // Same day swap
          updatedWeekPlan = {
            ...weekPlan,
            [activeDay]: {
              ...weekPlan[activeDay],
              [activeMeal]: recipeOver,
              [overMeal]: recipeActive,
            },
          };
        } else {
          // Different days swap
          updatedWeekPlan = {
            ...weekPlan,
            [activeDay]: {
              ...weekPlan[activeDay],
              [activeMeal]: recipeOver,
            },
            [overDay]: {
              ...weekPlan[overDay],
              [overMeal]: recipeActive,
            },
          };
        }

        // Resolve the promise with the updated week plan
        resolve(updatedWeekPlan);

        return updatedWeekPlan;
      });
    }).then(async (updatedWeekPlan) => {
      // Call addMealPlanToDB with the updated week plan
      await addMealPlanToDB(updatedWeekPlan);
    });
  };

  const cleanHtml = activeRecipe
    ? DOMPurify.sanitize(activeRecipe.summary)
    : null;

  return (
    <DndContext modifiers={[restrictToWindowEdges]} onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 h-screen bg-indigoNight p-5 space-x-5">
        <div className="flex flex-col col-span-2">
          {/* <div
          className={`fixed inset-y-0 left-0 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-20`}
        >
          <div className="p-5 text-black">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-5 right-5"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
            <nav className="mt-8">
              <a
                href="/"
                className="flex py-2.5 px-4 rounded transition duration-200 hover:bg-green-100 items-center"
              >
                <Home className="h-5 w-5 mr-3" /> Home
              </a>
              <a
                href="/recipes"
                className="flex py-2.5 px-4 rounded transition duration-200 hover:bg-green-100 items-center"
              >
                <Book className="h-5 w-5 mr-3" /> Browse Recipes
              </a>
              <a
                href="/grocery-list"
                className="flex py-2.5 px-4 rounded transition duration-200 hover:bg-green-100 items-center"
              >
                <ShoppingCart className="h-5 w-5 mr-3" /> Grocery List
              </a>
              <a
                href="/settings"
                className="flex *:py-2.5 px-4 rounded transition duration-200 hover:bg-green-100 items-center"
              >
                <Settings className="h-5 w-5 mr-3" /> Settings
              </a>
            </nav>
          </div>
        </div> */}
          {/* Hamburger Icon */}
          {/* <button
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-5 left-5 z-10"
        >
          <Menu className="h-6 w-6 text-green-800" />
        </button> */}
          <div className="basis-7/12 mb-5">
            <Card className="h-full flex flex-col">
              <CardHeader className="text-2xl font-bold bg-coralSunset">
                Weekly Meal Plan
              </CardHeader>
              <CardBody className="bg-goldenSand h-full flex-1">
                <div className="grid grid-cols-7 gap-2 flex-1 h-full">
                  {DAYS.map((day) => (
                    <div
                      key={day}
                      className="flex flex-col items-center text-black font-semibold"
                    >
                      {day}
                    </div>
                  ))}
                  {MEALS.map((meal, i) =>
                    DAYS.map((day, j) => {
                      const recipe = weekPlan[day][meal];
                      return (
                        <div
                          key={`${i}${j}`}
                          className="flex flex-col bg-ivoryCream text-center text-black h-24 rounded-lg shadow-md p-2"
                        >
                          <div className="flex-none text-xs font-medium mb-1">
                            {meal}
                          </div>
                          <Droppable id={`${day}.${meal}`}>
                            {recipe ? (
                              <Draggable recipe={recipe} id={recipe.id}>
                                <DraggableRecipeCard
                                  recipe={recipe}
                                  day={day}
                                  meal={meal}
                                />
                              </Draggable>
                            ) : (
                              <div
                                id={`${day}.${meal}`}
                                className="flex h-full border-2 border-dashed border-sageGreen rounded text-sageGreen justify-center items-center text-xs"
                              >
                                {"Drop meal here"}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="basis-3/12 text-black box-border">
            <Card className="flex flex-col justify-center h-full">
              <CardHeader className="text-lg font-bold text-black bg-coralSunset">
                Suggested Recipes
              </CardHeader>
              <CardBody className="bg-goldenSand h-full overflow-hidden flex-grow">
                {loadingSuggestedRecipes ? (
                  <p>Fetching your delicious recipes...</p>
                ) : (
                  <div className="flex overflow-x-auto no-scrollbar">
                    {suggestedRecipes.map((recipe, index) => (
                      <RecipeCard
                        key={index}
                        id={recipe.id}
                        onOpen={recipeModalConfig.onOpen}
                        recipe={recipe}
                        setActiveRecipe={setActiveRecipe}
                        setPendingModalOpen={setPendingModalOpen}
                      />
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="flex flex-col max-h-full overflow-y-auto no-scrollbar text-black rounded-lg bg-goldenSand p-5">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">Shopping List</div>
            <Dropdown className="text-black">
              <DropdownTrigger>
                <Button variant="light" className="text-xl">
                  ...
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="shopping list more actions"
                disabledKeys={["uncheck all"]}
              >
                <DropdownItem key="uncheck">Uncheck All</DropdownItem>
                <DropdownItem key="clear">Clear list</DropdownItem>
                <DropdownItem key="add">Add to Notes</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <Divider className="my-4" />
          {!loadingShoppingList &&
          shoppingListOption != ShoppingListOptions.SUGGEST &&
          shoppingListOption != ShoppingListOptions.EMPTY ? (
            <>
              <div className="flex items-center space-x-2">
                <Button
                  onPress={() =>
                    setShoppingListOption(ShoppingListOptions.AISLE)
                  }
                  variant="light"
                  endContent={<AisleIcon />}
                >
                  Aisles
                </Button>
                <Divider orientation="vertical" />
                <Button
                  variant="light"
                  onPress={() =>
                    setShoppingListOption(ShoppingListOptions.RECIPE)
                  }
                  endContent={<RecipeIcon />}
                >
                  Recipes
                </Button>
              </div>
              <Divider className="my-4" />
            </>
          ) : null}
          {loadingShoppingList ? (
            <div>Loading your shopping list...</div>
          ) : (
            <Card className="bg-lightGoldenSand overflow-y-auto">
              {shoppingListOption == ShoppingListOptions.EMPTY && (
                <>
                  <CardHeader className="font-bold text-sm justify-between">
                    You {" don't "} have any recipes added to your Meal Plan.
                    <Button isIconOnly variant="light">
                      <CloseIcon className="text-md" />
                    </Button>
                  </CardHeader>
                  <CardBody className="text-xs">
                    <div>
                      Get started by exploring{" "}
                      <span className="font-bold">Suggested Recipes</span> and
                      adding a recipe to your Meal Plan.
                    </div>
                  </CardBody>
                </>
              )}
              {shoppingListOption == ShoppingListOptions.SUGGEST && (
                <>
                  <CardHeader className="font-bold text-sm justify-between">
                    Need a Shopping List for your Meal Plan?
                    <Button isIconOnly variant="light">
                      <CloseIcon className="text-md" />
                    </Button>
                  </CardHeader>
                  <CardBody className="text-xs">
                    Add all the ingredients you need for your Plan with a click!
                    Want your customized list?
                  </CardBody>
                  <CardFooter className="space-x-4">
                    <Button
                      onPress={() => {
                        setShoppingListOption(ShoppingListOptions.RECIPE);
                      }}
                      className="bg-coralSunset text-lightGoldenSand"
                    >
                      Make My List
                    </Button>
                    <Button
                      variant="bordered"
                      className="border-coralSunset text-coralSunset"
                    >
                      Not Now
                    </Button>
                  </CardFooter>
                </>
              )}
              {shoppingListOption == ShoppingListOptions.AISLE && (
                <CardBody>
                  <Accordion
                    selectionMode="multiple"
                    defaultExpandedKeys={["0"]}
                  >
                    {shoppingListByAisle.map((aisle, index) => (
                      <AccordionItem
                        key={index}
                        aria-label={aisle.name}
                        title={
                          <div>
                            {aisle.name + " "}
                            <span className="text-coralSunset font-bold">
                              {"("}
                              {countNumUnboughtIngredients(aisle.ingredients)}
                              {")"}
                            </span>
                          </div>
                        }
                      >
                        {aisle.ingredients.map((ingredient, index) => (
                          <div key={index} className="space-y-2">
                            <Checkbox
                              onChange={() =>
                                toggleBoughtIngredientList(
                                  ingredient.name,
                                  ingredient.unit
                                )
                              }
                              defaultSelected={ingredient.isBought}
                              lineThrough={ingredient.isBought}
                              value={ingredient.name}
                            >
                              <div>
                                {`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
                              </div>
                            </Checkbox>
                            <Divider />
                          </div>
                        ))}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardBody>
              )}
              {shoppingListOption == ShoppingListOptions.RECIPE && (
                <CardBody>
                  {shoppingListByRecipe.map((recipe, index) => (
                    <div key={index} className="flex flex-col mb-10">
                      <div className="flex items-center space-x-3">
                        <Image
                          alt="recipe"
                          width="100"
                          height="100"
                          src={recipe.image}
                          className="rounded-md"
                        />
                        <div className="font-bold">{recipe.name}</div>
                      </div>
                      <Divider className="my-2" />
                      <div className="text-sm flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-bold text-coralSunset">
                            {recipe.readyInMinutes}
                          </div>
                          <div>Minutes</div>
                        </div>
                        <Divider orientation="vertical" className="mx-5" />
                        <div className="flex flex-col items-center">
                          <div className="text-coralSunset text-2xl font-bold">
                            {recipe.servings}
                          </div>
                          <div>Servings</div>
                        </div>
                        <Divider orientation="vertical" className="mx-5" />
                        <div className="flex flex-col items-center">
                          <div className="text-coralSunset text-2xl font-bold">
                            {countNumUnboughtIngredients(recipe.ingredients)}
                          </div>
                          <div>Ingredients</div>
                        </div>
                      </div>
                      <Divider className="my-2" />
                      {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="space-y-2">
                          <Checkbox
                            defaultSelected={ingredient.isBought}
                            lineThrough={ingredient.isBought}
                            onChange={() =>
                              toggleBoughtIngredientList(
                                ingredient.name,
                                ingredient.unit
                              )
                            }
                            value={ingredient.name}
                          >
                            <div className="flex justify-center space-x-1">
                              <p>{ingredient.amount}</p>
                              <p>{ingredient.unit}</p>
                              <p>{ingredient.name}</p>
                            </div>
                          </Checkbox>
                          <Divider />
                        </div>
                      ))}
                    </div>
                  ))}
                </CardBody>
              )}
            </Card>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          size="lg"
          isOpen={recipeModalConfig.isOpen}
          onOpenChange={recipeModalConfig.onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          className="text-black"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className="grid grid-cols-2 m-4">
                  <div className="flex flex-col">
                    <p className="font-bold">{activeRecipe?.name}</p>
                    <p className="text-sm text-gray-400">
                      {activeRecipe?.author}
                    </p>
                    <div className="flex items-center">
                      <Rating
                        name="half-rating-read"
                        defaultValue={activeRecipe?.rating}
                        precision={0.1}
                        readOnly
                        className="mr-2"
                      />
                      <div className="text-sm text-yellow-400">(4)</div>
                    </div>
                  </div>
                  <Image
                    width="500"
                    height="500"
                    alt="modal image"
                    src={activeRecipe?.image}
                    className="h-[150px] rounded-xl"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      onClose();
                      mealPlanModalConfig.onOpen();
                    }}
                  >
                    Proceed
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      {isModalOpen && (
        <Modal
          isOpen={mealPlanModalConfig.isOpen}
          onOpenChange={mealPlanModalConfig.onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          className="text-black"
        >
          <ModalContent className="text-black">
            {(onClose) => (
              <>
                <ModalBody className="m-3">
                  <div className="text-center text-xs">
                    Please select a day and meal for each serving of the recipe!
                  </div>
                  <MenuPlanModalDropdown firstOption="Serving 1">
                    {Array.from({
                      length: activeRecipe.servings,
                    }).map((_, i) => (
                      <DropdownItem
                        onClick={() => {
                          setDisplayMealDropdown(false);
                          setCurrentServing(i);
                        }}
                        textValue={"Serving " + (i + 1)}
                        key={"Serving " + (i + 1)}
                      >
                        Serving {i + 1}
                      </DropdownItem>
                    ))}
                  </MenuPlanModalDropdown>
                  {displayMealDropdown && (
                    <>
                      <MenuPlanModalDropdown
                        firstOption={
                          getFullyOccupiedDays(weekPlan).includes(
                            mealPlan[currentServing]["day"]
                          )
                            ? getEarliestFreeDay(weekPlan)
                            : mealPlan[currentServing]["day"]
                        }
                        disabledKeys={getFullyOccupiedDays(weekPlan)}
                      >
                        {DAYS.map((day) => (
                          <DropdownItem
                            onClick={() => {
                              setCurrentDay(day);
                              handleMealPlanChange("day", day);
                            }}
                            textValue={day}
                            key={day}
                          >
                            {day}
                          </DropdownItem>
                        ))}
                      </MenuPlanModalDropdown>

                      <MenuPlanModalDropdown
                        firstOption={
                          getOccupiedMeals(weekPlan, currentDay).includes(
                            mealPlan[currentServing]["meal"]
                          )
                            ? getEarliestFreeMeal(weekPlan, currentDay)
                            : mealPlan[currentServing]["meal"]
                        }
                        disabledKeys={getOccupiedMeals(weekPlan, currentDay)}
                      >
                        {MEALS.map((meal) => (
                          <DropdownItem
                            onClick={() => handleMealPlanChange("meal", meal)}
                            textValue={meal}
                            key={meal}
                          >
                            {meal}
                          </DropdownItem>
                        ))}
                      </MenuPlanModalDropdown>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose();
                      setIsModalOpen(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      onClose();
                      setIsModalOpen(false);
                      handleAddToMealPlan();
                      setCurrentServing(0);
                    }}
                  >
                    Add to meal plan
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </DndContext>
  );
}
