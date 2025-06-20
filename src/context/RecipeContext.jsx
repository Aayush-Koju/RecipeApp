import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const RecipeContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [localRecipes, setLocalRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => {
        const apiRecipes = res.data.meals || [];
        setRecipes((prev) => [...apiRecipes, ...prev]);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("recipes");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLocalRecipes(parsed);
        setRecipes((prev) => [...prev, ...parsed]); // merge local into recipes
      } catch (err) {
        console.error("Error parsing local recipes:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(localRecipes));
  }, [localRecipes]);

  const addRecipe = (recipe) => {
    setRecipes((prev) => [...prev, recipe]);
    setLocalRecipes((prev) => [...prev, recipe]);
  };

  const updateRecipe = (id, updatedRecipe) => {
    const updated = localRecipes.map((r) =>
      r.idMeal === id ? updatedRecipe : r
    );
    setLocalRecipes(updated);

    const updatedCombined = recipes.map((r) =>
      r.idMeal === id ? updatedRecipe : r
    );
    setRecipes(updatedCombined);
  };

  const deleteRecipe = (id) => {
    setLocalRecipes((prev) => {
      const filtered = prev.filter((r) => r.idMeal !== id);
      return filtered;
    });
    setRecipes((prev) => {
      const filtered = prev.filter((r) => r.idMeal !== id);
      return filtered;
    });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        localRecipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
