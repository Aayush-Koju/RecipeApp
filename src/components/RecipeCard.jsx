export default function RecipeCard({ name, author, image }) {
  return (
    <div className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      {/* <div className={`h-48 ${image}`}></div> */}
      <img src={image} alt={name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
        <p className="text-gray-500 text-sm">{author}</p>
      </div>
    </div>
  );
}
