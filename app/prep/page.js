"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/cardComponents";
import { Menu, X, Home, Book, ShoppingCart, Settings } from "lucide-react";
import RecipeCard from "@/components/recipes/RecipeCard";
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  closestCorners,
} from "@dnd-kit/core";
import Droppable from "@/components/dnd/Droppable";
import Draggable from "@/components/dnd/Draggable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import Carousel from "react-multi-carousel";
import {
  MEALS,
  DAYS,
  WEEK_PLAN_ID_DELIMITER,
  findContainerId,
  getRecipeById,
} from "@/utils/dnd";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import MenuPlanModalDropdown from "@/components/dropdown/MenuPlanModalDropdown";
import DraggableRecipeCard from "@/components/recipes/DraggableRecipeCard";

export default function Prep() {
  const recipeModalConfig = useDisclosure();
  const mealPlanModalConfig = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // {Monday: { Breakfast: null, Lunch: null, Dinner: null }, etc...}
  const [weekPlan, setWeekPlan] = useState(
    DAYS.reduce((acc, day) => {
      acc[day] = MEALS.reduce((mealAcc, meal) => {
        mealAcc[meal] = null;
        return mealAcc;
      }, {});
      return acc;
    }, {})
  );

  const [pendingModalOpen, setPendingModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mealPlan, setMealPlan] = useState([]);
  const [currentServing, setCurrentServing] = useState(0);
  const [displayMealDropdown, setDisplayMealDropdown] = useState(false);
  const [clonedWeekPlan, setClonedWeekPlan] = useState({});

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
  }, [activeRecipe, pendingModalOpen]);

  useEffect(() => {
    setDisplayMealDropdown(true);
  }, [currentServing]);

  const [suggestedRecipes, setSuggestedRecipes] = useState([
    { id: "recipe-1", name: "Oatmeal", servings: 3 },
    { id: "recipe-2", name: "Chicken Salad", servings: 2 },
    { id: "recipe-3", name: "Spaghetti Bolognese", servings: 1 },
    { id: "recipe-4", name: "Vegetable Stir Fry", servings: 1 },
    { id: "recipe-5", name: "Grilled Salmon", servings: 1 },
  ]);

  const handleMealPlanChange = (key, value) => {
    const updatedMealPlan = [...mealPlan];
    const updatedMeal = { ...updatedMealPlan[currentServing] };
    updatedMeal[key] = value;
    updatedMealPlan[currentServing] = updatedMeal;
    setMealPlan(updatedMealPlan);
  };

  const handleAddMealPlan = () => {
    mealPlan.forEach((serving, i) => {
      const day = serving.day;
      const meal = serving.meal;

      setActiveRecipe((activeRecipe) => {
        const updatedRecipe = {
          ...activeRecipe,
          id: activeRecipe.id + "-" + i, // Assuming you're modifying the 'id' field
        };

        // Call `addRecipeToWeekPlan` with the updated recipe after modifying it
        addRecipeToWeekPlan(updatedRecipe, day, meal);

        // Return the updated recipe to ensure state updates properly
        return updatedRecipe;
      });
    });
  };

  // --------- HELPER FUNCTION ------------------->
  const addRecipeToWeekPlan = (recipe, day, meal) => {
    setWeekPlan((weekPlan) => {
      return {
        ...weekPlan,
        [day]: {
          ...weekPlan[day],
          [meal]: recipe,
        },
      };
    });
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

  const onDragStart = ({ active }) => {
    setActiveId(active.id);
    // setClonedWeekPlan(weekPlan);
  };

  const onDragOver = ({ active, over }) => {
    const activeContainerId = findContainerId(weekPlan, active.id);
    const overContainerId = findContainerId(weekPlan, over?.id);

    if (
      !activeContainerId ||
      !overContainerId ||
      activeContainerId === overContainerId
    ) {
      return;
    }

    /* setWeekPlan((weekPlan) => {
      const [activeDay, activeMeal] = activeContainerId.split(
        WEEK_PLAN_ID_DELIMITER
      );
      const [overDay, overMeal] = overContainerId.split(WEEK_PLAN_ID_DELIMITER);

      const recipeActive = weekPlan[activeDay][activeMeal];
      const recipeOver = weekPlan[overDay][overMeal];
      console.log(recipeActive, recipeOver);

      // Swap active and over recipe
      return {
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
    }); */
  };

  const onDragEnd = ({ active, over }) => {
    const activeContainerId = findContainerId(weekPlan, active.id);
    const overContainerId = findContainerId(weekPlan, over?.id);

    if (
      !activeContainerId ||
      !overContainerId ||
      activeContainerId === overContainerId
    ) {
      return;
    }

    setWeekPlan((weekPlan) => {
      const [activeDay, activeMeal] = activeContainerId.split(
        WEEK_PLAN_ID_DELIMITER
      );
      const [overDay, overMeal] = overContainerId.split(WEEK_PLAN_ID_DELIMITER);

      const recipeActive = weekPlan[activeDay][activeMeal];
      const recipeOver = weekPlan[overDay][overMeal];
      console.log(recipeActive, recipeOver);

      // Swap recipes
      if (activeDay === overDay) {
        // Same day swap
        return {
          ...weekPlan,
          [activeDay]: {
            ...weekPlan[activeDay],
            [activeMeal]: recipeOver,
            [overMeal]: recipeActive,
          },
        };
      } else {
        // Different days swap
        return {
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
    });
  };

  const currDragRecipe = activeId
    ? getRecipeById(suggestedRecipes, activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      modifiers={[restrictToWindowEdges]}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="flex flex-col h-screen bg-indigoNight p-8">
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
        <div className="flex flex-col mb-4 basis-3/5">
          <Card className="h-full flex flex-col">
            <CardHeader className="text-2xl font-bold bg-coralSunset">
              Weekly Meal Plan
            </CardHeader>
            <CardContent className="bg-goldenSand flex-1">
              <div className="grid grid-cols-7 gap-2">
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
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col basis-2/5 text-black">
          <Card className="h-full flex flex-col">
            <CardHeader className="text-lg font-bold text-black bg-coralSunset">
              Suggested Recipes
            </CardHeader>
            <CardContent className="bg-goldenSand h-full flex-1">
              <Carousel
                additionalTransfrom={0}
                arrows={true}
                autoPlaySpeed={3000}
                centerMode={false}
                draggable={false}
                focusOnSelect={true}
                infinite={false}
                minimumTouchDrag={80}
                partialVisible={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024,
                    },
                    items: 5,
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 3,
                    },
                    items: 5,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464,
                    },
                    items: 5,
                  },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                showDots={false}
                swipeable
              >
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
              </Carousel>
              {isModalOpen && (
                <Modal
                  isOpen={recipeModalConfig.isOpen}
                  onOpenChange={recipeModalConfig.onOpenChange}
                  isDismissable={false}
                  isKeyboardDismissDisabled={true}
                  className="text-black"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalBody>
                          <p>{activeRecipe?.id}</p>
                          <p>{activeRecipe?.name}</p>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
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
                            Please select a day and meal for each serving of the
                            recipe!
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
                                firstOption={mealPlan[currentServing]["day"]}
                              >
                                {DAYS.map((day) => (
                                  <DropdownItem
                                    onClick={() =>
                                      handleMealPlanChange("day", day)
                                    }
                                    textValue={day}
                                    key={day}
                                  >
                                    {day}
                                  </DropdownItem>
                                ))}
                              </MenuPlanModalDropdown>

                              <MenuPlanModalDropdown
                                firstOption={mealPlan[currentServing]["meal"]}
                              >
                                {MEALS.map((meal) => (
                                  <DropdownItem
                                    onClick={() =>
                                      handleMealPlanChange("meal", meal)
                                    }
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
                              handleAddMealPlan();
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
            </CardContent>
          </Card>
        </div>
      </div>
    </DndContext>
  );
}
