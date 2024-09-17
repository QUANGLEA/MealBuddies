"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  CardHeader,
  ScrollArea,
} from "@/components/cardComponents";
import { Menu, X, Home, Book, ShoppingCart, Settings } from "lucide-react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const MEALS = ["Breakfast", "Lunch", "Dinner"];

const MealPlanner = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const [suggestedRecipes, setSuggestedRecipes] = useState([
    { id: "recipe-1", name: "Oatmeal" },
    { id: "recipe-2", name: "Chicken Salad" },
    { id: "recipe-3", name: "Spaghetti Bolognese" },
    { id: "recipe-4", name: "Vegetable Stir Fry" },
    { id: "recipe-5", name: "Grilled Salmon" },
  ]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === "SUGGESTED_RECIPES") {
      const newSuggestedRecipes = Array.from(suggestedRecipes);
      const [movedRecipe] = newSuggestedRecipes.splice(source.index, 1);

      const [day, meal] = destination.droppableId.split("-");
      setWeekPlan((prevWeekPlan) => ({
        ...prevWeekPlan,
        [day]: {
          ...prevWeekPlan[day],
          [meal]: movedRecipe,
        },
      }));
      setSuggestedRecipes(newSuggestedRecipes);
    } else {
      const [sourceDay, sourceMeal] = source.droppableId.split("-");
      const [destDay, destMeal] = destination.droppableId.split("-");

      setWeekPlan((prevWeekPlan) => {
        const newWeekPlan = { ...prevWeekPlan };
        const movedRecipe = newWeekPlan[sourceDay][sourceMeal];

        newWeekPlan[sourceDay] = {
          ...newWeekPlan[sourceDay],
          [sourceMeal]: null,
        };

        newWeekPlan[destDay] = {
          ...newWeekPlan[destDay],
          [destMeal]: movedRecipe,
        };

        return newWeekPlan;
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col h-screen bg-gradient-to-br from-green-200 to-blue-400 p-4">
        <div
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
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-100 flex items-center"
              >
                <Home className="h-5 w-5 mr-3" /> Home
              </a>
              <a
                href="/recipes"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-100 flex items-center"
              >
                <Book className="h-5 w-5 mr-3" /> Browse Recipes
              </a>
              <a
                href="/grocery-list"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-100 flex items-center"
              >
                <ShoppingCart className="h-5 w-5 mr-3" /> Grocery List
              </a>
              <a
                href="/settings"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-100 flex items-center"
              >
                <Settings className="h-5 w-5 mr-3" /> Settings
              </a>
            </nav>
          </div>
        </div>
        <div className="flex flex-col w-full p-4">
          {/* Hamburger Icon */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="fixed top-5 left-5 z-10"
          >
            <Menu className="h-6 w-6 text-green-800" />
          </button>

          <div className="flex-grow mb-4">
            <Card className="h-full">
              <CardHeader className="text-2xl font-bold text-green-800">
                Weekly Meal Plan
              </CardHeader>
              <CardContent className="overflow-auto">
                <div className="grid grid-cols-7 gap-2 min-w-max">
                  {DAYS.map((day) => (
                    <div
                      key={day}
                      className="text-center font-semibold text-green-700"
                    >
                      {day}
                    </div>
                  ))}
                  {DAYS.map((day) =>
                    MEALS.map((meal) => (
                      <Droppable
                        key={`${day}-${meal}`}
                        droppableId={`${day}-${meal}`}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`w-32 h-24 rounded-lg shadow-md p-2 flex flex-col
                                     ${
                                       snapshot.isDraggingOver
                                         ? "bg-green-100"
                                         : "bg-white bg-opacity-50"
                                     }`}
                          >
                            <div className="text-xs font-medium text-green-600 mb-1">
                              {meal}
                            </div>
                            {weekPlan[day][meal] ? (
                              <Draggable
                                draggableId={weekPlan[day][meal].id}
                                index={0}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`flex-grow rounded p-1 text-sm flex items-center justify-center text-green-800
                                              ${
                                                snapshot.isDragging
                                                  ? "bg-green-200"
                                                  : "bg-green-100"
                                              }`}
                                  >
                                    {weekPlan[day][meal].name}
                                  </div>
                                )}
                              </Draggable>
                            ) : (
                              <div className="flex-grow border-2 border-dashed border-green-300 rounded flex items-center justify-center text-green-500 text-xs">
                                Drop meal here
                              </div>
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="h-1/4 min-h-[200px] text-black">
            <Card className="h-full">
              <CardHeader className="text-xl font-bold text-green-800">
                Suggested Recipes
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100%-3rem)]">
                  <Droppable
                    droppableId="SUGGESTED_RECIPES"
                    direction="horizontal"
                  >
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex"
                      >
                        {suggestedRecipes.map((recipe, index) => (
                          <Draggable
                            key={recipe.id}
                            draggableId={recipe.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white bg-opacity-75 p-3 mr-2 rounded-lg shadow cursor-move
                                          ${
                                            snapshot.isDragging
                                              ? "bg-green-200"
                                              : "hover:bg-green-100"
                                          }
                                          transition-colors duration-200 flex items-center justify-center
                                          w-32 h-20 flex-shrink-0`}
                              >
                                {recipe.name}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default MealPlanner;

const dummyData = {
  cuisines: ["Asian", "Vietnamese", "Chinese"],
  diets: [],
  allergies: [],
  excludeIngredients: [],
};
