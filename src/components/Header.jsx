import { ChefHat, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-emerald-700 text-white px-4 py-8">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ChefHat />
          <span className="font-bold text-xl">Recipedia</span>
        </div>

        {/* Desktop Nav */}
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
        </nav>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute left-0 top-full w-full bg-emerald-700 shadow-md md:hidden z-50">
          <div className="flex flex-col items-start px-6 py-4 space-y-2 text-lg">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "font-semibold underline" : "hover:text-emerald-200"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/recipes"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "font-semibold underline" : "hover:text-emerald-200"
              }
            >
              Recipes
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
