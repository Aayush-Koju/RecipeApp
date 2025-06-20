import React, { useContext } from "react";
import RecipeCard from "./RecipeCard";
import RecipeImage from "/src/assets/images/recipe-image.jpg";
import { RecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";

export default function PopularRecipes() {
  const { recipes } = useContext(RecipeContext);
  const navigate = useNavigate();

  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Popular Recipes Of The Week
            </h2>
            <p className="text-gray-600 text-lg mt-2">
              Our most popular recipes of this week
            </p>
          </div>
          <button
            onClick={() => navigate("/recipes")}
            className="text-emerald-600 text-lg cursor-pointer"
          >
            See all
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recipes.slice(0, 6).map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              id={recipe.idMeal}
              title={recipe.strMeal}
              description={recipe.strInstructions}
              image={recipe.strMealThumb}
              category={recipe.strCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
