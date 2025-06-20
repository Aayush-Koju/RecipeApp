import { ChefHat } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-emerald-700 text-white px-4 py-8">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ChefHat />
          <span className="font-bold text-xl">Recipedia</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold underline"
                : "hover:text-emerald-200"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold underline"
                : "hover:text-emerald-200"
            }
          >
            Recipes
          </NavLink>
          <NavLink
            to="/manage"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold underline"
                : "hover:text-emerald-200"
            }
          >
            Manage
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
