import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecipeListCard({
  id,
  title,
  description,
  image,
  category,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <button
              className="p-2 rounded-md border border-gray-200 bg-white/90 hover:bg-white transition cursor-pointer"
              onClick={() => onEdit(id)}
            >
              <Edit className="w-4 h-4 text-gray-800" />
            </button>
            <button
              className="p-2 rounded-md border border-red-500 bg-red-500/90 hover:bg-red-500 transition cursor-pointer"
              onClick={() => onDelete(id)}
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
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
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
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
