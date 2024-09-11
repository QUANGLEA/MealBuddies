"use client";

// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FoodCard from "../components/FoodCard";
import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import MultipleCarousel from "../components/MultipleCarousel";
import AllergyCard from "../components/AllergyCard";
import DietCard from "../components/DietCard";
import ExcludeIngredientCard from "../components/ExcludeIngredientCard";
import AutocompleteSearch from "../api/search/AutocompleteSearch.js";
import { FormControlLabel, Switch, Slide } from "@mui/material";

export default function Start() {
  let foodCards = [];
  for (let i = 0; i < 12; i++) {
    foodCards.push(i);
  }
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <main className="flex flex-col w-screen h-screen items-center bg-gray-200">
      <div className="mt-2.5 mb-2.5 h-24"></div>
      <div className="text-black">What is your favorite cuisine?</div>

      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        {
          <MultipleCarousel>
            {foodCards.map((index) => (
              <FoodCard key={index} />
            ))}
          </MultipleCarousel>
        }
      </Slide>
      {/* <div className="text-black">Do you have any food allergies?</div>
      <MultipleCarousel>
        {foodCards.map((index) => (
          <AllergyCard key={index} />
        ))}
      </MultipleCarousel>
      <div className="text-black">Do you follow any of these diets?</div>
      <MultipleCarousel>
        {foodCards.map((index) => (
          <DietCard key={index} />
        ))}
      </MultipleCarousel>
      <div className="text-black">
        Do you wish to exclude any ingredients from your recommended recipes?
      </div>
      <MultipleCarousel>
        {foodCards.map((index) => (
          <ExcludeIngredientCard key={index} />
        ))}
      </MultipleCarousel>
      <AutocompleteSearch /> */}
    </main>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
];
