import { useState } from "react";

function SearchBar({ value = "", onChange }) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.value;

    setLocalValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleClear = () => {
    setLocalValue("");

    if (onChange) {
      onChange("");
    }
  };

  return (
    <div className="search-bar-wrapper">
      <input
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder="Search Pokémon..."
        aria-label="Search Pokémon"
      />

      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;