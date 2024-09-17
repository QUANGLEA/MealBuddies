import MultipleCarousel from "./MultipleCarousel";
import { allergies } from "../../data/allergies";
import AllergyCard from "../preferences/AllergyCard";

export default function AllergyCarousel({ handleSelectAllergy }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-black">Do you have any food allergies?</div>
      <MultipleCarousel>
        {allergies.map((allergy, index) => (
          <AllergyCard
            name={allergy.name}
            icon={allergy.icon}
            key={index}
            handleSelectAllergy={handleSelectAllergy}
          />
        ))}
      </MultipleCarousel>
    </div>
  );
}
