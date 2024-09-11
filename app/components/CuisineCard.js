import Image from "next/image";
import transparentBg from "../../public/images/transparent_bg.png";
import { useState } from "react";

export default function CuisineCard({ name, img }) {
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
        src={isClicked ? transparentBg : img}
        alt=""
        onClick={handleClick}
      />
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        {name}
      </div>
    </div>
  );
}
