import {
  Search,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  MapPinned,
} from "lucide-react";
import { useState } from "react";

const properties = [
  {
    id: 1,
    title: "Modern City Centre Apartment",
    price: "£1,200",
    location: "London",
    beds: 2,
    baths: 1,
    sqft: 850,
    image:
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    id: 2,
    title: "Cozy Studio Near University",
    price: "£650",
    location: "Manchester",
    beds: 1,
    baths: 1,
    sqft: 450,
    image:
      "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    id: 3,
    title: "Spacious Family Home",
    price: "£1,800",
    location: "Birmingham",
    beds: 3,
    baths: 2,
    sqft: 1200,
    image:
      "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    id: 4,
    title: "Minimalist Loft Apartment",
    price: "£950",
    location: "Leeds",
    beds: 2,
    baths: 1,
    sqft: 700,
    image:
      "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    id: 5,
    title: "Victorian Conversion Flat",
    price: "£1,100",
    location: "Bristol",
    beds: 2,
    baths: 2,
    sqft: 900,
    image:
      "https://images.pexels.com/photos/1444316/pexels-photo-1444316.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    id: 6,
    title: "Waterfront Luxury Penthouse",
    price: "£2,500",
    location: "London",
    beds: 3,
    baths: 3,
    sqft: 1500,
    image:
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
];

export default function PropertyList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) =>
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      {/* radial lights */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.15),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Find Your Perfect Home
          </h1>
          <p className="text-slate-400">
            Browse available properties and connect with flatmates
          </p>
        </div>

        {/* search */}
        <div className="mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by location or property name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleFavorite(p.id)}
                  className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites[p.id]
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }`}
                  />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {p.title}
                </h3>

                <div className="flex items-center text-slate-400 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{p.location}</span>
                </div>

                <div className="mb-4 pb-4 border-b border-slate-800">
                  <p className="text-2xl font-bold text-blue-400">
                    {p.price}
                    <span className="text-sm text-slate-400"> /month</span>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Bed className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                    <p className="text-white font-semibold">{p.beds}</p>
                    <p className="text-slate-400 text-xs">Beds</p>
                  </div>
                  <div className="text-center">
                    <Bath className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                    <p className="text-white font-semibold">{p.baths}</p>
                    <p className="text-slate-400 text-xs">Baths</p>
                  </div>
                  <div className="text-center">
                    <Maximize2 className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                    <p className="text-white font-semibold">{p.sqft}</p>
                    <p className="text-slate-400 text-xs">sqft</p>
                  </div>
                </div>

                <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-lg shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* empty */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <MapPinned className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">
              No properties found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
