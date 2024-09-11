import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";

export default function AutocompleteSearch() {
  const [query, setQuery] = useState(""); // The search input
  const [options, setOptions] = useState([]); // Suggestions from API
  const [loading, setLoading] = useState(false); // Loading state

  // Handle API calls as the user types
  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&number=10&apiKey=0eed779fa71b4c38ae1a0042cfd90e09`
    )
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
        setLoading(false);
      });
  }, [query]); // Trigger API call when query changes

  return (
    <div className="flex w-80">
      <Autocomplete
        className="w-full"
        freeSolo
        id="autocomplete ingredients"
        options={options.map((option) => option.name)} // Pass the ingredient names
        onInputChange={(_, value) => setQuery(value)} // Update the query as user types
        loading={loading} // Show loading indicator
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add other ingredients to exclude"
            variant="outlined"
          />
        )}
      />
    </div>
  );
}
