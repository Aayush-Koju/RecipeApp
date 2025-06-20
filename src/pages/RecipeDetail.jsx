import { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import Header from "../components/Header";

export default function RecipeDetail() {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);

  // Find recipe by id
  const recipe = recipes.find((r) => r.idMeal === id);
  console.log(recipe);

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          No recipes found
        </h3>
      </div>
    );
  }

  // Prepare instructions as array, splitting by dot or newline (your data shape)
  const instructions = recipe.strInstructions
    ? recipe.strInstructions.split(/\.\s+/).filter(Boolean)
    : [];

  // Prepare ingredients with measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ name: ingredient, amount: measure || "" });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="px-4 py-8">
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Recipe Image */}
            <div className="relative">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                {recipe.strCategory}
              </div>
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                {recipe.strArea}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                {recipe.strMeal}
              </h1>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Instructions
                </h2>
                <div className="space-y-4">
                  {instructions.map((step, idx) => (
                    <div key={idx} className="flex space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed pt-1">
                        {step}.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Ingredients
            </h2>
            <ul className="space-y-2 pl-2">
              {ingredients.map((ing, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-emerald-600 font-bold text-lg mr-2">
                    &#8226;
                  </span>
                  <span className="text-gray-700 leading-snug mt-1 mr-2">
                    <span className="font-medium">{ing.amount.trim()}</span>{" "}
                    {ing.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
