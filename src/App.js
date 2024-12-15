import React, { useState } from "react";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchType, setSearchType] = useState("ingredient");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    setError("");
    
    try {
      let apiUrl = '';
      switch(searchType) {
        case 'ingredient':
          apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`;
          break;
        case 'name':
          apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
          break;
        case 'category':
          apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchQuery}`;
          break;
        case 'area':
          apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchQuery}`;
          break;
        case 'random':
          apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
          break;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError("No recipes found matching your criteria.");
      }
    } catch (err) {
      setError("There was an error fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: "url('https://source.unsplash.com/1600x900/?food,kitchen')"}}>
      
      <div className="bg-black bg-opacity-60 p-6">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Taylor's Recipe Explorer
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <select 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
            className="p-2 rounded bg-white"
          >
            <option value="ingredient">By Ingredient</option>
            <option value="name">By Recipe Name</option>
            <option value="category">By Category</option>
            <option value="area">By Area</option>
            <option value="random">Random Recipe</option>
          </select>

          {searchType !== 'random' && (
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search by ${searchType}`}
              className="p-2 rounded flex-grow max-w-md"
            />
          )}

          <button 
            onClick={handleSearch}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            {searchType === 'random' ? 'Get Random Recipe' : 'Find Recipes'}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading && <div className="text-center text-white text-xl">Loading...</div>}
        {error && <div className="text-center text-red-400 text-xl">{error}</div>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div 
              key={recipe.idMeal} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <img 
                src={recipe.strMealThumb} 
                alt={recipe.strMeal} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <a 
                  href={`https://www.themealdb.com/meal/${recipe.idMeal}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-lg hover:text-green-600 transition"
                >
                  {recipe.strMeal}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;