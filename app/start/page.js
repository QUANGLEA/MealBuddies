"use client";

// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CuisineCard from "../components/CuisineCard";
import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import MultipleCarousel from "../components/MultipleCarousel";
import AllergyCard from "../components/AllergyCard";
import DietCard from "../components/DietCard";
import ExcludeIngredientCard from "../components/ExcludeIngredientCard";
import AutocompleteSearch from "../api/search/AutocompleteSearch";
import { cuisines } from "../data/cuisines";
import { diets } from "../data/diets";
import { allergies } from "../data/allergies";
import { ingredients } from "../data/ingredients";

export default function Start() {
  console.log("This is cuisines: " + cuisines);
  return (
    <main className="flex flex-col w-screen h-screen items-center bg-gray-200">
      <div className="mt-1 mb-1 h-24"></div>
      <div className="text-black">What is your favorite cuisine?</div>
      <div className="flex flex-col">
        <MultipleCarousel>
          {cuisines.map((cuisine, index) => (
            <CuisineCard name={cuisine.name} img={cuisine.img} key={index} />
          ))}
        </MultipleCarousel>
        <button />
      </div>
      {/* <div className="text-black">Do you have any food allergies?</div>
      <MultipleCarousel>
        {allergies.map((allergy, index) => (
          <AllergyCard name={allergy.name} icon={allergy.icon} key={index} />
        ))}
      </MultipleCarousel>
      <div className="text-black">Do you follow any of these diets?</div>
      <MultipleCarousel>
        {diets.map((diet, index) => (
          <DietCard name={diet.name} icon={diet.icon} key={index} />
        ))}
      </MultipleCarousel>
      <div className="text-black">
        Do you wish to exclude any ingredients from your recommended recipes?
      </div>
      <MultipleCarousel>
        {ingredients.map((ingredient, index) => (
          <ExcludeIngredientCard
            name={ingredient.name}
            icon={ingredient.icon}
            key={index}
          />
        ))}
      </MultipleCarousel>
      <AutocompleteSearch /> */}
    </main>
  );
}
