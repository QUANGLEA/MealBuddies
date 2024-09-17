export default function Browse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-400 p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-6">Browse Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example recipe cards */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              Recipe {i}
            </h2>
            <p className="text-gray-600">Description of Recipe {i}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
