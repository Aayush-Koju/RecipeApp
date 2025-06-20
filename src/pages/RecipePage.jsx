import { useState, useEffect, useContext } from "react";
import Header from "/src/components/Header";
import SearchAndFilters from "/src/components/SearchAndFilters";
import RecipeListCard from "/src/components/RecipeListCard";
import Pagination from "/src/components/Pagination";
import AddRecipeModal from "/src/components/AddRecipeModal";
import { RecipeContext } from "../context/RecipeContext";
// import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [activeCategory, setActiveCategory] = useState("All recipes");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  const recipesPerPage = 9;
  const { recipes, localRecipes, deleteRecipe } = useContext(RecipeContext);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400); // debounce delay in ms

    // Cleanup
    return () => clearTimeout(handler);
  }, [searchQuery]);

  //For Search Using API
  {
    /* useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  Search triggers API call
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setFilteredRecipes(recipes);
        return;
      }

      try {
        const response = await axios.get(
          `${API_URL}/search.php?s=${searchQuery}`
        );
        const meals = response.data.meals || [];
        setFilteredRecipes(meals);
      } catch (err) {
        console.error("Search fetch failed:", err);
        setFilteredRecipes([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery, recipes]);*/
  }

  const handleEditRecipe = (id) => {
    setIsEditing(true);
    setEditingRecipeId(id);
    setIsModalOpen(true);
  };

  const handleDeleteRecipe = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id);
    }
  };

  const handleAddRecipe = () => {
    setIsEditing(false);
    setEditingRecipeId(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingRecipeId(null);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      activeCategory === "All recipes" ||
      recipe.strCategory === activeCategory ||
      recipe.category === activeCategory;

    const recipeName = recipe.strMeal || recipe.name || "";
    const recipeInstructions =
      recipe.strInstructions || recipe.procedures?.join(" ") || "";

    const matchesSearch =
      recipeName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      recipeInstructions
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  //pagination
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
              <span className="text-emerald-600">recipes,</span>
              <br />
              <span className="text-emerald-600">in one place</span>
            </h1>
            <p className="text-gray-600 text-xl">
              Discover, create, and manage your personal recipe collection
            </p>
          </div>

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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedRecipes.map((recipe) => (
              <RecipeListCard
                key={recipe.idMeal}
                id={recipe.idMeal}
                title={recipe.strMeal}
                description={recipe.strInstructions}
                image={recipe.strMealThumb}
                category={recipe.strCategory}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

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
                className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
              >
                Add your first recipe &rarr;
              </button>
            </div>
          )}
        </div>
      </main>

      <AddRecipeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isEditing={isEditing}
        id={editingRecipeId}
      />

      {localRecipes.length !== 0 && (
        <section className="px-4 py-16">
          <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  New Recipes
                </h2>
                <p className="text-gray-600 text-lg mt-2">
                  Freshly added recipes
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {localRecipes.map((recipe) => (
                <RecipeListCard
                  key={recipe.idMeal}
                  id={recipe.idMeal}
                  title={recipe.strMeal}
                  description={recipe.strInstructions}
                  image={recipe.strMealThumb}
                  category={recipe.strCategory}
                  onEdit={handleEditRecipe}
                  onDelete={handleDeleteRecipe}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
