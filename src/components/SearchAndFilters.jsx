import { Search, Filter, Plus } from "lucide-react";

const categories = [
  "All recipes",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Vegetarian",
  "Meat",
  "Seafood",
  "Dessert",
  "Fast & Easy",
];

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  onAddRecipe,
}) {
  return (
    <div className="space-y-6">
      {/* Search Bar and Add Recipe Button */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            className="flex items-center space-x-2 rounded border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100 transition"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button
            type="button"
            onClick={onAddRecipe}
            className="flex items-center space-x-2 rounded bg-emerald-600 px-3 py-1 text-white hover:bg-emerald-700 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Recipe</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`
                px-4 py-1 rounded text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
