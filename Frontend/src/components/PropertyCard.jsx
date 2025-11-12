export default function PropertyCard({ p, onView, onEdit, onDelete, onBook }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src="https://images.unsplash.com/photo-1560185127-6a8c5f1b60c9?auto=format&fit=crop&w=800&q=80"
        alt={p.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-xl font-semibold mb-1">{p.title || "Untitled"}</h3>
      <p className="text-gray-600 text-sm">{p.address}, {p.city}</p>
      <p className="mt-2"><span className="font-semibold">Rent:</span> ₹{p.rent ?? "-"}</p>
      <p className="text-sm text-gray-700"><span className="font-semibold">Type:</span> {p.propertyType || "-"}</p>
      <p className="text-sm text-gray-700"><span className="font-semibold">Furnished:</span> {p.furnished ? "Yes" : "No"}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {onView && (
          <button onClick={onView} className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            View
          </button>
        )}
        {onEdit && (
          <button onClick={onEdit} className="px-3 py-2 rounded bg-amber-600 text-white hover:bg-amber-700">
            Edit
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete} className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700">
            Delete
          </button>
        )}
        {onBook && (
          <button onClick={onBook} className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700">
            Book
          </button>
        )}
      </div>
    </div>
  );
}
