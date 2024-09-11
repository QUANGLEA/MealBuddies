import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import Image from "next/image";
import { useState } from "react";
import wheatIcon from "../../public/images/wheat_icon.png";

export default function DietCard() {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <div className="flex justify-center text-black">
      <CircleOutlinedIcon
        onClick={handleClick}
        sx={{ fontSize: 110 }}
        className={`${
          isClicked ? "text-green-600" : "text-gray-400"
        } opacity-75 transition ease-in-out delay-100 hover:opacity-100`}
      />
      <Image
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-100%]"
        src={wheatIcon}
        alt="wheat-free icon"
        width="20"
      ></Image>
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[20%] text-[0.5rem]">
        WHEAT-FREE
      </div>
    </div>
  );
}
