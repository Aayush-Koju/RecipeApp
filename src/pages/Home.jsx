import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PopularRecipes from "../components/PopularRecipes";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PopularRecipes />
    </div>
  );
}
