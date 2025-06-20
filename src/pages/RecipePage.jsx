import { useState, useEffect } from "react";
import Header from "/src/components/Header";
import SearchAndFilters from "/src/components/SearchAndFilters";
import RecipeListCard from "/src/components/RecipeListCard";
import Pagination from "/src/components/Pagination";

const sampleRecipes = [
  {
    id: "1",
    title: "Miso Yaki Onigiri",
    description:
      "Traditional Japanese grilled rice balls with savory miso glaze",
    image: "bg-orange-200",
    category: "Japanese",
  },
  {
    id: "2",
    title: "Best Chicken Marinade",
    description: "Juicy grilled chicken with herbs and spices marinade",
    image: "bg-yellow-300",
    category: "Meat",
  },
  {
    id: "3",
    title: "Beef Soboro",
    description: "Japanese ground beef rice bowl with sweet and savory flavors",
    image: "bg-red-200",
    category: "Meat",
  },
  {
    id: "4",
    title: "Japanese Pancakes",
    description: "Fluffy and thick pancakes perfect for breakfast",
    image: "bg-yellow-100",
    category: "Breakfast",
  },
  {
    id: "5",
    title: "Sweet Potato Soup",
    description: "Creamy and warming soup perfect for cold days",
    image: "bg-orange-300",
    category: "Vegetarian",
  },
  {
    id: "6",
    title: "Turkey & Coriander Burgers",
    description: "Healthy turkey burgers with fresh coriander and guacamole",
    image: "bg-green-200",
    category: "Meat",
  },
  {
    id: "7",
    title: "Nikujaga",
    description: "Japanese comfort food with beef and potatoes",
    image: "bg-amber-200",
    category: "Japanese",
  },
  {
    id: "8",
    title: "Vegetable Soup",
    description: "Hearty vegetable soup packed with nutrients",
    image: "bg-red-300",
    category: "Vegetarian",
  },
  {
    id: "9",
    title: "Japanese Chicken Curry",
    description: "Mild and flavorful curry with tender chicken",
    image: "bg-yellow-400",
    category: "Japanese",
  },
  {
    id: "10",
    title: "Avocado Toast",
    description: "Healthy breakfast with fresh avocado and herbs",
    image: "bg-green-300",
    category: "Breakfast",
  },
  {
    id: "11",
    title: "Salmon Teriyaki",
    description: "Glazed salmon with Japanese teriyaki sauce",
    image: "bg-pink-200",
    category: "Seafood",
  },
  {
    id: "12",
    title: "Chocolate Brownies",
    description: "Rich and fudgy chocolate brownies",
    image: "bg-amber-800",
    category: "Dessert",
  },
  {
    id: "13",
    title: "Caesar Salad",
    description: "Classic Caesar salad with homemade dressing",
    image: "bg-green-400",
    category: "Vegetarian",
  },
  {
    id: "14",
    title: "Beef Stir Fry",
    description: "Quick and easy beef stir fry with vegetables",
    image: "bg-red-400",
    category: "Meat",
  },
  {
    id: "15",
    title: "Banana Bread",
    description: "Moist and delicious homemade banana bread",
    image: "bg-yellow-200",
    category: "Dessert",
  },
  {
    id: "16",
    title: "Shrimp Scampi",
    description: "Garlic butter shrimp with pasta",
    image: "bg-orange-400",
    category: "Seafood",
  },
  {
    id: "17",
    title: "Greek Salad",
    description: "Fresh Mediterranean salad with feta cheese",
    image: "bg-green-500",
    category: "Vegetarian",
  },
  {
    id: "18",
    title: "BBQ Ribs",
    description: "Tender barbecue ribs with smoky sauce",
    image: "bg-red-500",
    category: "Meat",
  },
  {
    id: "19",
    title: "Apple Pie",
    description: "Classic American apple pie with cinnamon",
    image: "bg-yellow-500",
    category: "Dessert",
  },
  {
    id: "20",
    title: "Fish Tacos",
    description: "Fresh fish tacos with lime and cilantro",
    image: "bg-blue-200",
    category: "Seafood",
  },
];

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All recipes");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const handleEditRecipe = (id) => {
    console.log("Edit recipe:", id);
  };

  const handleDeleteRecipe = (id) => {
    console.log("Delete recipe:", id);
  };

  const handleAddRecipe = () => {
    console.log("Add new recipe");
  };

  const filteredRecipes = sampleRecipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All recipes" || recipe.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const paginatedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + recipesPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="px-4 py-8">
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              All your favorite{" "}
              <span className="text-emerald-600">recipes</span>,
              <br />
              <span className="text-emerald-600">in one place</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Discover, create, and manage your personal recipe collection
            </p>
          </div>

          {/* Search and Filters */}
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onAddRecipe={handleAddRecipe}
          />

          {/* Results Count */}
          <div className="my-6">
            <p className="text-gray-600">
              Showing {startIndex + 1}-
              {Math.min(startIndex + recipesPerPage, filteredRecipes.length)} of{" "}
              {filteredRecipes.length} recipe
              {filteredRecipes.length !== 1 ? "s" : ""}
              {activeCategory !== "All recipes" && ` in ${activeCategory}`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {/* Recipe Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedRecipes.map((recipe) => (
              <RecipeListCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
                category={recipe.category}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {/* Empty State */}
          {paginatedRecipes.length === 0 && filteredRecipes.length === 0 && (
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
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={handleAddRecipe}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Add your first recipe &rightarrow;
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
