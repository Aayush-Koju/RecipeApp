import React from "react";
import heroImage1 from "/src/assets/images/hero-section-food-1.png";
import heroImage2 from "/src/assets/images/hero-section-food-2.png";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-emerald-700 text-white px-4 py-16 min-h-[85vh] flex items-center relative overflow-hidden">
      <div className="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
            The Easiest Way
            <br />
            To Make Your
            <br />
            Favorite Meal
          </h1>
          <p className="text-emerald-100 text-lg xl:text-xl">
            Discover 1000+ recipes in your hand with the best recipe app. Help
            you to find the easiest way to cook.
          </p>
          <button
            onClick={() => navigate("/recipes")}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-lg text-lg cursor-pointer"
          >
            Explore Recipes
          </button>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="relative">
            {/* Top right food image */}
            <div className="absolute -top-8 right-0 w-48 h-48 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72">
              <img
                src={heroImage1}
                alt="Delicious roasted chicken with vegetables"
                className="w-full h-full object-cover rounded-full shadow-xl"
              />
            </div>

            {/* Bottom left food image */}
            <div className="absolute top-16 -left-8 w-40 h-40 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64">
              <img
                src={heroImage2}
                alt="Healthy chicken and avocado bowl"
                className="w-full h-full object-cover rounded-full shadow-xl"
              />
            </div>

            {/* Spacer to maintain layout */}
            <div className="w-64 h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
