import { ChefHat, Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-12 h-12 text-white" />
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="font-bold text-2xl text-gray-800">Cookpedia</span>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-emerald-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recipe Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Oops! The recipe you're looking for seems to have been eaten
            already. Don't worry, we have plenty more delicious recipes waiting
            for you!
          </p>
        </div>

        {/* Action Buttons */}
        <div onClick={() => navigate("/")} className="space-y-4">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition cursor-pointer">
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
