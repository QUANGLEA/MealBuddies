"use client";
import { Divider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@mui/material";
import { Avatar } from "@nextui-org/react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import { Spacer } from "@nextui-org/react";
import Carousel from "react-multi-carousel";
import porkSteakImg from "@/public/images/browse/pork_steak.jpg";
import butterChickenImg from "@/public/images/browse/butter_chicken.jpg";
import friedRiceImg from "@/public/images/browse/fried_rice.jpg";
import RecipeCard from "@/components/browse/RecipeCard";
import { signOutUserAction } from "@/data/actions/auth-actions";
import { useRouter } from "next/navigation";

const CAROUSEL_IMAGES = [porkSteakImg, butterChickenImg, friedRiceImg];

export default function Browse() {
  const router = useRouter();
  const [apiRecipes, setApiRecipes] = useState(
    Array.from({ length: 10 }, () => ({
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
    }))
  );
  const [aiRecipes, setAiRecipes] = useState(
    Array.from({ length: 10 }, () => ({
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
    }))
  );

  useEffect(() => {
    // Fetch API recipes
    fetch("/api/recipe/getRandomRecipes")
      .then((response) => response.json())
      .then((data) => setApiRecipes(data));
  }, []);

  const updateAPIRecipes = async (recipeId) => {};

  return (
    <div className="min-h-screen p-8 bg-lightGoldenSand text-black">
      <header className="flex justify-between space-x-10 items-center">
        <h1 className="text-2xl font-bold">MealBuddies</h1>
        <Spacer x={20} />
        <div class="px-3 flex space-x-2 rounded-3xl items-center w-full min-h-12">
          <input
            placeholder="Search recipe and more..."
            className="text-black bg-transparent focus:outline-none w-full text-xl"
          ></input>
        </div>
        <div className="flex items-center space-x-3">
          <Avatar
            onClick={() => signOutUserAction()}
            isBordered
            color="danger"
            className="cursor-pointer"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
          <div className="min-w-max">John Doe</div>
        </div>
      </header>
      <div className="flex h-full">
        <nav className="w-1/6 pr-6">
          <Spacer y={50} />
          <h2 className="text-gray-500 mb-2">DISCOVER</h2>
          <ul className="space-y-2">
            <li className="flex items-center px-3 py-1">
              <HomeIcon size={18} className="mr-2" /> Home
            </li>
            <li className="flex bg-black rounded-full text-white items-center px-3 py-1">
              <SearchIcon size={18} className="mr-2" /> Browse
            </li>
            <li
              className="flex items-center px-3 py-1 cursor-pointer"
              onClick={() => router.push("/prep")}
            >
              <CalendarMonthIcon size={18} className="mr-2" /> Prep
            </li>
          </ul>
          <h2 className="text-gray-500 mt-6 mb-2">LIBRARY</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FavoriteIcon size={18} className="mr-2" /> Favourites
            </li>
            <li className="flex items-center">
              <RamenDiningIcon size={18} className="mr-2" /> My Recipes
            </li>
          </ul>
        </nav>
        <div className="w-5/6 p-5">
          <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlay
            autoPlaySpeed={2000}
            centerMode={false}
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 3,
                partialVisibilityGutter: 40,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 3,
                partialVisibilityGutter: 30,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 3,
                partialVisibilityGutter: 30,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
            transitionDuration={1000}
          >
            {CAROUSEL_IMAGES.map((img, i) => (
              <Image
                key={i}
                alt="carousel picture"
                style={{ objectFit: "cover", borderRadius: "3rem" }}
                className="h-full w-full p-4"
                src={img}
              />
            ))}
          </Carousel>
          <Spacer y={10} />
          <div className="font-bold text-2xl">Daily Best Recipes</div>
          <Spacer y={8} />
          <div className="grid grid-cols-3 gap-16">
            {apiRecipes.map((recipe, i) => (
              <RecipeCard key={i} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
