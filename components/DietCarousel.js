import MultipleCarousel from "./MultipleCarousel";
import DietCard from "./preferences/DietCard";
import { diets } from "../data/diets.js";

export default function DietCarousel() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-black">Do you follow any of these diets?</div>
      <MultipleCarousel>
        {diets.map((diet, index) => (
          <DietCard name={diet.name} icon={diet.icon} key={index} />
        ))}
      </MultipleCarousel>
    </div>
  );
}
