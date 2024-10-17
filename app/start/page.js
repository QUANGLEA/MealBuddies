"use client";

import React, { useRef, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Button } from "@nextui-org/button";
import CuisineCarousel from "../../components/carousels/CuisineCarousel";
import AllergyCarousel from "../../components/carousels/AllergyCarousel";
import DietCarousel from "../../components/carousels/DietCarousel";
import IncludeIngredientCarousel from "../../components/carousels/IncludeIngredientCarousel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spacer } from "@nextui-org/react";

export default function Start() {
  const router = useRouter();
  const carouselRef = useRef(null);
  const NUM_SLIDES = 4;
  const [slideNum, setSlideNum] = useState(1);
  const { data: session } = useSession();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleSelectCuisine = (cuisine) =>
    handlePreferenceSelection(selectedCuisines, setSelectedCuisines, cuisine);

  const handleSelectDiet = (diet) =>
    handlePreferenceSelection(selectedDiets, setSelectedDiets, diet);

  const handleSelectAllergy = (allergy) =>
    handlePreferenceSelection(selectedAllergies, setSelectedAllergies, allergy);

  const handleSelectIngredient = (ingredient) =>
    handlePreferenceSelection(
      selectedIngredients,
      setSelectedIngredients,
      ingredient
    );

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (!isSubmitted) return;

    const handleSubmitPreferences = async () => {
      const newPreferences = {
        cuisines: selectedCuisines,
        diets: selectedDiets,
        allergies: selectedAllergies,
        ingredients: selectedIngredients,
      };
      try {
        const response = await fetch("/api/preferences/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            preferences: newPreferences,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Preferences updated successfully:", response);
      } catch (e) {
        console.error("Error updating preferences:", e);
      }
    };

    handleSubmitPreferences();
    router.push("/prep");
  }, [
    isSubmitted,
    selectedCuisines,
    selectedAllergies,
    selectedDiets,
    selectedIngredients,
    router,
  ]);

  return (
    <>
      {session && (
        <main className="flex flex-col w-screen h-screen items-center bg-lightGoldenSand">
          <Spacer y={20} />
          <div className="text-black font-bold text-2xl mb-20">
            Hello {session.user.name}
          </div>
          <Carousel
            ref={carouselRef}
            additionalTransfrom={0}
            arrows={false}
            autoPlaySpeed={3000}
            centerMode={false}
            containerClass="container"
            draggable={false}
            focusOnSelect={false}
            infinite={false}
            minimumTouchDrag={80}
            partialVisible={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 1,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 1,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            showDots={false}
            swipeable
          >
            <CuisineCarousel handleSelectCuisine={handleSelectCuisine} />
            <AllergyCarousel handleSelectAllergy={handleSelectAllergy} />
            <DietCarousel handleSelectDiet={handleSelectDiet} />
            <IncludeIngredientCarousel
              handleSelectIngredient={handleSelectIngredient}
            />
          </Carousel>
          <div className="flex space-x-2">
            {slideNum != 1 ? (
              <Button
                color="primary"
                variant="bordered"
                onClick={() => {
                  carouselRef.current.previous();
                  setSlideNum(slideNum - 1);
                }}
              >
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              color="primary"
              variant="solid"
              onClick={() => {
                if (slideNum < NUM_SLIDES) {
                  carouselRef.current.next();
                  setSlideNum(slideNum + 1);
                } else {
                  handleSubmit();
                }
              }}
            >
              {slideNum == NUM_SLIDES ? "Done" : "Next"}
            </Button>
          </div>
        </main>
      )}
    </>
  );
}

const handlePreferenceSelection = (state, setState, item) => {
  // If the cuisine is already selected, remove it
  if (state.includes(item)) {
    setState(state.filter((e) => e !== item));
  } else {
    // Otherwise, add it to the selected options
    setState([...state, item]);
  }
};
