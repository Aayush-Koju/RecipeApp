import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipesPage from "./pages/RecipePage";
import { RecipeProvider } from "./context/RecipeContext";
import RecipeDetail from "./pages/RecipeDetail";

function App() {
  return (
    <RecipeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </RecipeProvider>
  );
}

export default App;
