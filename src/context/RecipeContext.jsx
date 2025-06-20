import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const RecipeContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => setRecipes(res.data.meals || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
