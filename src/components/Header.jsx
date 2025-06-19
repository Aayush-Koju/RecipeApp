import { ChefHat } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-emerald-700 text-white px-4 py-8">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ChefHat />
          <span className="font-bold text-xl">Recipedia</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-lg">
          <a href="#" className="hover:text-emerald-200">
            Home
          </a>
          <a href="#" className="hover:text-emerald-200">
            Recipes
          </a>
          <a href="#" className="hover:text-emerald-200">
            Manage
          </a>
        </nav>
      </div>
    </header>
  );
}
