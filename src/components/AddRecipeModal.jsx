import React, { useState, useEffect, useContext } from "react";
import { X, Plus, Trash2, Upload } from "lucide-react";
import { RecipeContext } from "../context/RecipeContext";

export default function AddRecipeModal({
  isOpen,
  onClose,
  isEditing = false,
  id = null,
}) {
  const { recipes, addRecipe, updateRecipe } = useContext(RecipeContext);

  const [formData, setFormData] = useState({
    idMeal: "",
    strMeal: "",
    strCategory: "",
    strMealThumb: "",
    strIngredient1: "",
    strIngredient2: "",
    strIngredient3: "",
    strIngredient4: "",
    strInstructions: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && id && recipes.length > 0) {
      const recipeToEdit = recipes.find(
        (recipe) => recipe.id === id || recipe.idMeal === id
      );
      if (recipeToEdit) {
        let ingredients = {
          strIngredient1: "",
          strIngredient2: "",
          strIngredient3: "",
          strIngredient4: "",
        };

        if (
          recipeToEdit.strIngredients &&
          Array.isArray(recipeToEdit.strIngredients)
        ) {
          recipeToEdit.strIngredients.forEach((ingredient, index) => {
            if (index < 4 && ingredient.trim()) {
              ingredients[`strIngredient${index + 1}`] = ingredient.trim();
            }
          });
        } else {
          ingredients = {
            strIngredient1: recipeToEdit.strIngredient1 || "",
            strIngredient2: recipeToEdit.strIngredient2 || "",
            strIngredient3: recipeToEdit.strIngredient3 || "",
            strIngredient4: recipeToEdit.strIngredient4 || "",
          };
        }

        setFormData({
          idMeal: recipeToEdit.idMeal || "",
          strMeal: recipeToEdit.strMeal || "",
          strCategory: recipeToEdit.strCategory || "",
          strMealThumb: recipeToEdit.strMealThumb || "",
          ...ingredients,
          strInstructions: recipeToEdit.strInstructions || "",
        });
      }
    } else if (!isEditing) {
      setFormData({
        idMeal: "",
        strMeal: "",
        strCategory: "",
        strMealThumb: "",
        strIngredient1: "",
        strIngredient2: "",
        strIngredient3: "",
        strIngredient4: "",
        strInstructions: "",
      });
    }
  }, [isEditing, id, recipes, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.strMeal.trim()) newErrors.strMeal = "Recipe name is required";
    if (!formData.strCategory.trim())
      newErrors.strCategory = "Category is required";
    if (!formData.strMealThumb.trim())
      newErrors.strMealThumb = "Image URL is required";

    const hasIngredients = [
      formData.strIngredient1,
      formData.strIngredient2,
      formData.strIngredient3,
      formData.strIngredient4,
    ].some((ingredient) => ingredient.trim());

    if (!hasIngredients)
      newErrors.ingredients = "At least one ingredient is required";

    if (!formData.strInstructions.trim())
      newErrors.strInstructions = "Instructions are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");

    if (validateForm()) {
      const cleanedData = {
        strMeal: formData.strMeal.trim(),
        strCategory: formData.strCategory.trim(),
        strMealThumb: formData.strMealThumb.trim(),
        strIngredient1: formData.strIngredient1.trim(),
        strIngredient2: formData.strIngredient2.trim(),
        strIngredient3: formData.strIngredient3.trim(),
        strIngredient4: formData.strIngredient4.trim(),
        strInstructions: formData.strInstructions.trim(),
      };

      if (isEditing && id) {
        const updatedRecipe = {
          ...cleanedData,
          id: id,
          idMeal: formData.idMeal || id,
          updatedAt: new Date().toISOString(),
        };
        updateRecipe(id, updatedRecipe);
        alert("Recipe updated successfully!");
      } else {
        const newRecipe = {
          ...cleanedData,
          id: Date.now().toString(),
          idMeal: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        addRecipe(newRecipe);
        alert("Recipe added successfully!");
      }

      onClose();

      // Reset form
      setFormData({
        idMeal: "",
        strMeal: "",
        strCategory: "",
        strMealThumb: "",
        strIngredient1: "",
        strIngredient2: "",
        strIngredient3: "",
        strIngredient4: "",
        strInstructions: "",
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form when closing
    setFormData({
      idMeal: "",
      strMeal: "",
      strCategory: "",
      strMealThumb: "",
      strIngredient1: "",
      strIngredient2: "",
      strIngredient3: "",
      strIngredient4: "",
      strInstructions: "",
    });
    setErrors({});
  };

  const ingredientFields = [
    { key: "strIngredient1", label: "Ingredient 1", required: true },
    { key: "strIngredient2", label: "Ingredient 2", required: false },
    { key: "strIngredient3", label: "Ingredient 3", required: false },
    { key: "strIngredient4", label: "Ingredient 4", required: false },
  ];

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Edit Recipe" : "Add New Recipe"}
          </h2>
          <button
            onClick={handleClose}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Recipe Name *
            </label>
            <input
              id="name"
              value={formData.strMeal}
              onChange={(e) => handleInputChange("strMeal", e.target.value)}
              placeholder="Enter recipe name"
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.strMeal ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.strMeal && (
              <p className="text-red-500 text-sm mt-1">{errors.strMeal}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Category *
            </label>
            <input
              id="category"
              value={formData.strCategory}
              onChange={(e) => handleInputChange("strCategory", e.target.value)}
              placeholder="e.g., Breakfast, Lunch, Dinner, Dessert"
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.strCategory ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.strCategory && (
              <p className="text-red-500 text-sm mt-1">{errors.strCategory}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Image URL *
            </label>
            <div className="flex space-x-2">
              <input
                id="image"
                value={formData.strMealThumb}
                onChange={(e) =>
                  handleInputChange("strMealThumb", e.target.value)
                }
                placeholder="Enter image URL"
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 ${
                  errors.strMealThumb ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.strMealThumb && (
              <p className="text-red-500 text-sm mt-1">{errors.strMealThumb}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Ingredients * (Max 4)
              </label>
            </div>
            <div className="space-y-3">
              {ingredientFields.map((field) => (
                <div key={field.key}>
                  <label
                    htmlFor={field.key}
                    className="text-sm font-medium text-gray-600 block mb-1"
                  >
                    {field.label} {field.required && "*"}
                  </label>
                  <input
                    id={field.key}
                    value={formData[field.key]}
                    onChange={(e) =>
                      handleInputChange(field.key, e.target.value)
                    }
                    placeholder="e.g., 2 cups flour"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              ))}
            </div>
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="instructions"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Instructions *
            </label>
            <textarea
              id="instructions"
              value={formData.strInstructions}
              onChange={(e) =>
                handleInputChange("strInstructions", e.target.value)
              }
              placeholder="Enter cooking instructions step by step..."
              rows={6}
              className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
                errors.strInstructions ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.strInstructions && (
              <p className="text-red-500 text-sm mt-1">
                {errors.strInstructions}
              </p>
            )}
          </div>

          <div className="flex space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-emerald-600 text-white hover:bg-emerald-700 h-10 px-4 py-2 flex-1 cursor-pointer"
            >
              {isEditing ? "Update Recipe" : "Add Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
