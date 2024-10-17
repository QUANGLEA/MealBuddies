"use client";

import { useState, useEffect } from "react";
import mealBuddiesLogo from "@/public/images/logo/mealbuddies_logo.png";
import chefBg from "@/public/images/home/chef_pasta_bg.png";
import Image from "next/image";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import CallMadeIcon from "@mui/icons-material/CallMade";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import {
  Input,
  ButtonGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";

const foodAvatars = [
  "/images/home/food1.jpg",
  "/images/home/food2.jpg",
  "/images/home/food3.jpg",
  "/images/home/food4.jpg",
  "/images/home/food5.jpg",
];
import { categories } from "@/data/home/categoriesCarouselData";
import Link from "next/link";
import { ImageList, ImageListItem } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(new Set(["Newest"]));
  const selectedOptionValue = Array.from(selectedOption)[0];

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  // Automatically rotate through categories every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedCategoryIndex(
        (prevIndex) => (prevIndex + 1) % categories.length
      );
    }, 3000); // 3 seconds interval

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const selectedCategory = categories[selectedCategoryIndex];

  return (
    <div className="min-h-screen bg-lightGoldenSand p-12">
      <header className="flex justify-between items-center py-4 rounded-lg">
        <Image alt="logo" height="80" src={mealBuddiesLogo} />
        <nav className="flex lg:space-x-12">
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </a>
          <a href="/" className="text-gray-600  hover:text-gray-800">
            Meal Prep
          </a>
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Recipes
          </a>
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Blogs
          </a>
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Gallery
          </a>
        </nav>
        <button
          className="mr-5 px-5 py-2 bg-black text-white rounded-full"
          onClick={() => router.push("/signin")}
        >
          Sign Up
        </button>
      </header>

      <div className="bg-indigoNight rounded-3xl flex justify-between h-full px-10 ">
        <div className="flex flex-col justify-between max-w-xs my-12 min-h-full">
          <div className="flex flex-col space-y-5">
            <h1 className="text-4xl font-bold ">
              Discover Simple, Delicious, And{" "}
              <span className="text-red-400">Fast Recipes!</span>
            </h1>
            <p className="text-sm text-gray-400">
              A recipe is soulless. The essence of the recipe must come from
              you, the cook.
            </p>
            <Button className="bg-white w-36" endContent={<CallMadeIcon />}>
              Read More
            </Button>
          </div>
          <div className="flex-flex-col justify-self-end space-y-3">
            <AvatarGroup isBordered max={5}>
              {foodAvatars.map((url, i) => (
                <Avatar key={i} src={url} />
              ))}
            </AvatarGroup>
            <p>5000+ Recipes</p>
          </div>
        </div>
        <Image
          src={chefBg}
          className="self-end h-full w-[400px] hidden md:block"
          alt="chef bg image"
        />
        <div className="flex flex-col my-12 space-y-5 min-h-full justify-between max-w-xs">
          <div className="flex flex-col space-y-5">
            <h1 className="text-2xl font-bold ">Top Recipes</h1>
            <p className="text-sm text-gray-400">
              We have a community of professional chefs and homecooks to provide
              you with the perfect recipes for your palate.
            </p>
            <Button className="bg-white w-44" endContent={<CallMadeIcon />}>
              Check our recipes
            </Button>
          </div>
          <iframe
            src="https://www.youtube.com/embed/YTZGPCCB2FU?si=Pm_Vo0zc06NDLQ9h&amp;controls=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen={false}
            className="rounded-2xl h-44"
          ></iframe>
        </div>
      </div>
      <div className="flex justify-between mt-12 text-black mx-10">
        <h1 className="text-4xl font-bold">Recipes</h1>
        <div className="flex space-x-3">
          <div class="px-3 flex border-2 space-x-2 border-gray-400 rounded-3xl items-center min-w-80">
            <SearchIcon />
            <input
              placeholder="Search recipe and more..."
              className="bg-transparent focus:outline-none w-full"
            ></input>
          </div>
          <ButtonGroup variant="flat">
            <Button className="bg-white">
              <div>
                Sort by:{" "}
                <span className="font-bold">{selectedOptionValue}</span>
              </div>
            </Button>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly className="bg-white">
                  <ExpandMoreIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="recipe sort options"
                selectedKeys={selectedOption}
                selectionMode="single"
                onSelectionChange={setSelectedOption}
                className="max-w-[300px] text-black"
              >
                <DropdownItem key="Newest">Newest</DropdownItem>
                <DropdownItem key="Ratings">Ratings</DropdownItem>
                <DropdownItem key="Prep Time">Prep Time</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </div>
      </div>
      <div className="flex items-center py-6 h-full space-x-0 mx-10">
        {/* Sidebar Menu */}
        <div className="w-1/6">
          <ul className="space-y-4">
            {categories.map((category, index) => (
              <li key={category.name}>
                <button
                  className={`w-full border-2 flex items-center border-gray-400 py-1 px-2 rounded-full text-lg ${
                    index == selectedCategoryIndex
                      ? "bg-indigoNight text-white"
                      : "text-black"
                  }`}
                >
                  {/* You can replace these emoji icons with real SVGs or icons */}
                  <div
                    className={`rounded-full ${
                      index == selectedCategoryIndex ? "p-1" : "p-1.5"
                    } flex items-center justify-center ${
                      index == selectedCategoryIndex
                        ? "bg-white"
                        : "bg-indigoNight"
                    }`}
                  >
                    {index == selectedCategoryIndex
                      ? category.filledIcon
                      : category.outlinedIcon}
                  </div>
                  <Spacer x={5} />
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Image */}
        <div className="w-3/6 flex self-stretch justify-center">
          <Image
            src={selectedCategory.mainImg}
            alt="Main Dish"
            width={200}
            height={200}
            className="rounded-3xl w-auto h-full"
          />
        </div>

        {/* Recipes Section */}
        <div className="w-2/6 self-stetch flex flex-col space-y-6 h-full justify-between items-center">
          {selectedCategory.recipes.map((recipe, i) => (
            <div
              key={recipe.name}
              className="flex h-full w-full items-center bg-indigoNight text-white rounded-3xl p-4 space-x-5"
            >
              <Image
                src={recipe.img} // Show recipe images based on selected category
                alt={recipe.name}
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col justify-center h-full w-full">
                <h3 className="text-lg h-1/3 font-semibold">{recipe.name}</h3>
                <div className="flex items-center h-2/3 space-x-5">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-400">Serving</p>
                    <div>
                      {Array(recipe.servings)
                        .fill(0)
                        .map((_, idx) => (
                          <PersonIcon key={idx} />
                        ))}
                    </div>
                  </div>
                  <div className="border-gray-400 border-l-2 self-stretch m-2" />
                  <div>
                    <p className="text-sm text-gray-400">Cook Time</p>
                    <p>{recipe.cookTime}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col py-10 px-20 space-y-10 mt-32 bg-goldenSand items-center shadow-xl rounded-3xl text-black">
        <h1 className="font-bold text-4xl">What They Say</h1>
        <div className="flex justify-center w-full space-x-10">
          <Image
            alt="chef quote"
            src="/images/home/quote/chef.jpg"
            width={400}
            height={100}
            className="rounded-3xl w-1/2 h-auto"
          />
          <div className="flex flex-col w-1/2 justify-between">
            <div>
              <h1 className="text-3xl">
                Meal prepping has always been a tidious and time consuming
                process for me even as a chef. With MealBuddies, I saved so much
                time planning meals for my loved ones.
              </h1>
              <Spacer y={4} />
              <p className="text-lg font-bold">Brian Veirmont</p>
              <p className="text-lg text-gray-500 italic">Professional Chef</p>
            </div>
            <div className="flex justify-end">
              <ArrowCircleLeftOutlinedIcon className="text-6xl opacity-25" />
              <ArrowCircleRightOutlinedIcon className="text-6xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-center mt-32 text-black space-y-10">
        <h1 className="font-bold text-4xl">Our Blog</h1>
        <div className="flex space-x-5 justify-center w-full">
          <div className="w-1/2 space-y-5">
            <Image
              alt="blog 1"
              src="/images/home/blog/chef_soup.jpg"
              width={300}
              height={200}
              className="w-full h-auto rounded-3xl"
            />
            <div>
              <p className="font-bold text-2xl">Inspiration for unique Soup</p>
              <p className="text-xl text-gray-500">
                We present a variety of unique soupo from many countries...
              </p>
            </div>
            <Spacer y={5} />
            <Link className="underline font-bold text-xl" href="#">
              Read more
            </Link>
          </div>
          <div className="w-1/2 space-y-5">
            <Image
              alt="blog 2"
              src="/images/home/blog/chef_plating.jpg"
              width={300}
              height={200}
              className="w-full h-auto rounded-3xl"
            />
            <div>
              <p className="font-bold text-2xl">The art of plating</p>
              <p className="text-xl text-gray-500">
                Eating with your family is a tradition while going to a...
              </p>
            </div>
            <Spacer y={5} />
            <Link className="underline font-bold text-xl" href="#">
              Read more
            </Link>
          </div>
        </div>
        <Button
          className="bg-indigoNight w-44 text-white"
          endContent={<CallMadeIcon />}
          size="lg"
        >
          More blogs
        </Button>
      </div>
      <div className="flex flex-col mt-32 items-center h-full text-black w-full space-y-10">
        <h1 className="font-bold text-4xl">Gallery</h1>
        <ImageList className="w-full h-auto" variant="woven" cols={2} gap={20}>
          {galleryData.map((item) => (
            <ImageListItem key={item.img}>
              <Image
                alt={item.title}
                src={item.img}
                width={400}
                height={300}
                className="w-full rounded-3xl"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}

const galleryData = [
  {
    img: "/images/home/carousel/pizza.jpg",
    title: "pizza",
  },
  {
    img: "/images/home/carousel/dessert.jpg",
    title: "dessert",
  },
  {
    img: "/images/home/carousel/grill.jpg",
    title: "grill",
  },
  {
    img: "/images/home/carousel/mocktail.jpg",
    title: "mocktail",
  },
];
