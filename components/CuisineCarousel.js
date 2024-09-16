import MultipleCarousel from "./MultipleCarousel";
import CuisineCard from "./preferences/CuisineCard";
import { cuisines } from "../data/cuisines";

export default function CuisineCarousel() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-black">What is your favorite cuisine?</div>
      <MultipleCarousel>
        {cuisines.map((cuisine, index) => (
          <CuisineCard name={cuisine.name} img={cuisine.img} key={index} />
        ))}
      </MultipleCarousel>
    </div>
  );
}
