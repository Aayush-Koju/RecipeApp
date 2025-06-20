import { useNavigate } from "react-router-dom";

export default function RecipeCard({
  id,
  title,
  description,
  image,
  category,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <div className="absolute top-2 left-2">
          <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-emerald-700 mb-1 hover:text-emerald-600 cursor-pointer transition">
          {title}
        </h3>
        <p className="text-gray-600 text-base mb-3 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="p-4 w-full mx-auto flex items-center justify-center h-16">
        <button
          onClick={() => navigate(`/recipe/${id}`)}
          className="w-full bg-emerald-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-emerald-700 transition cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
