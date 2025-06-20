import RecipeCard from "./RecipeCard";
import RecipeImage from "/src/assets/images/recipe-image.jpg";

const recipes = [
  { name: "Salmon Salad", author: "By Calum Lewis", image: RecipeImage },
  { name: "Ice Matcha Latte", author: "By Zoey Henley", image: RecipeImage },
  { name: "Avocado Toast", author: "By Mike Thompson", image: RecipeImage },
  { name: "Easy Mojitos", author: "By David Charles", image: RecipeImage },
  { name: "Fluffy Pancake", author: "By Ann Tran", image: RecipeImage },
  {
    name: "Pineapple Guacamole",
    author: "By Clara Moore",
    image: RecipeImage,
  },
];

export default function PopularRecipes() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Popular Recipes Of The Week
            </h2>
            <p className="text-gray-600 mt-2">
              Our most popular recipes of this week
            </p>
          </div>
          <button className="text-emerald-600">See all</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.name}
              description={recipe.author}
              image={recipe.image}
              category={"new"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
