import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const RecipeContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await axios.get(`${API_URL}/search.php?s=${searchQuery}`);
      const data = await res.json();
      setRecipes(data.meals || []);
      setCurrentPage(1);
    };
    fetchRecipes();
  }, [searchQuery]);

  // Get recipes for current page
  const paginatedRecipes = recipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        paginatedRecipes,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        recipesPerPage,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
