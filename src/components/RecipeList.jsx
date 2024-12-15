import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }) {
     return (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
         {recipes.map((recipe) => (
           <RecipeCard key={recipe.idMeal} recipe={recipe} />
         ))}
       </div>
     );
   }
   