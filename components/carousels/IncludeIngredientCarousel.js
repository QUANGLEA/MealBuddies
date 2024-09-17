import MultipleCarousel from "./MultipleCarousel";
import { ingredients } from "../../data/ingredients";
import IncludeIngredientCard from "../preferences/IncludeIngredientCard";
import AutocompleteSearch from "../preferences/AutocompleteSearch";

export default function IncludeIngredientCarousel({ handleSelectIngredient }) {
  return (
    <div className="flex flex-col justify-center items-center my-5">
      <div className="text-black">Which ingredients do you currently have?</div>
      <MultipleCarousel>
        {ingredients.map((ingredient, index) => (
          <IncludeIngredientCard
            name={ingredient.name}
            icon={ingredient.icon}
            key={index}
            handleSelectIngredient={handleSelectIngredient}
          />
        ))}
      </MultipleCarousel>
      <AutocompleteSearch />
    </div>
  );
}
