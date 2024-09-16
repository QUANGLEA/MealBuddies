import MultipleCarousel from "./MultipleCarousel";
import { ingredients } from "../data/ingredients";
import ExcludeIngredientCard from "./preferences/ExcludeIngredientCard";
import AutocompleteSearch from "../app/api/search/AutocompleteSearch";

export default function ExcludeIngredientCarousel() {
  return (
    <div className="flex flex-col justify-center items-center my-5">
      <div className="text-black">
        Do you wish to exclude any ingredients from your recommended recipes?
      </div>
      <MultipleCarousel>
        {ingredients.map((ingredient, index) => (
          <ExcludeIngredientCard
            name={ingredient.name}
            icon={ingredient.icon}
            key={index}
          />
        ))}
      </MultipleCarousel>
      <AutocompleteSearch />
    </div>
  );
}
