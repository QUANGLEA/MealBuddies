import Image from "next/image";
import transparentBg from "../../public/images/transparent_bg.png";
import { useState } from "react";

export default function FoodCard() {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <div className="flex justify-center text-white text-sm">
      <Image
        className="rounded-full transition ease-in-out delay-100 hover:opacity-50 bg-green-600"
        width={90}
        height={90}
        src={
          isClicked
            ? transparentBg
            : "https://img.spoonacular.com/recipes/1697885-90x90.jpg"
        }
        alt=""
        onClick={handleClick}
      />
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        Mexican
      </div>
    </div>
  );
}
