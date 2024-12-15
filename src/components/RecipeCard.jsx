const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
      <img
        className="w-full h-56 object-cover"
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />
      <div className="p-4">
        <h3 className="text-2xl font-semibold text-gray-800">{recipe.strMeal}</h3>
        <a
          href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Click to view recipe
        </a>

      </div>
    </div>
  );
};

export default RecipeCard;
