"use client";

import React, { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import { Button } from "@nextui-org/button";
import CuisineCarousel from "../../components/CuisineCarousel";
import AllergyCarousel from "../../components/AllergyCarousel";
import DietCarousel from "../../components/DietCarousel";
import ExcludeIngredientCarousel from "../../components/ExcludeIngredientCarousel";

export default function Start() {
  const carouselRef = useRef(null);
  const [slideNum, setSlideNum] = useState(1);
  const NUM_SLIDES = 4;
  return (
    <main className="flex flex-col w-screen h-screen items-center bg-gray-200">
      <div className="mt-1 mb-1 h-24"></div>
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
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        partialVisible={false}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
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
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        <CuisineCarousel />
        <AllergyCarousel />
        <DietCarousel />
        <ExcludeIngredientCarousel />
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
            carouselRef.current.next();
            setSlideNum(slideNum + 1);
          }}
        >
          {slideNum == NUM_SLIDES ? "Done" : "Next"}
        </Button>
      </div>
    </main>
  );
}
