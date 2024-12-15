import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [ingredient, setIngredient] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(ingredient);
    }
  };

  return (
    <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search by ingredient..."
        className="w-full p-4 rounded-full text-lg placeholder-gray-500 bg-white bg-opacity-80 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
      />
    </div>
  );
};

export default SearchBar;
