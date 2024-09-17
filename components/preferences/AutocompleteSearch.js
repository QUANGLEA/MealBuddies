import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default function AutocompleteSearch() {
  const [query, setQuery] = useState(""); // The search input
  const [options, setOptions] = useState([]); // Suggestions from API
  const [loading, setLoading] = useState(false); // Loading state

  // Handle API calls as the user types
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&number=10&apiKey=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data != null) {
          setOptions(data);
        } else {
          setOptions([]);
        }

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
