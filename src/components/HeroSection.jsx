import React from "react";

export default function HeroSection() {
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
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-lg text-lg cursor-pointer">
            Explore Recipes
          </button>
        </div>

        <div className="relative"></div>
      </div>
    </section>
  );
}
