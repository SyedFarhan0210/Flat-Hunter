import {
  Heart,
  MessageCircle,
  User,
  MapPin,
  Briefcase,
  Tag,
  Search,
} from "lucide-react";
import { useState } from "react";

const flatmates = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 26,
    location: "London",
    occupation: "Software Engineer",
    budget: "£1,000 – £1,500",
    interests: ["Yoga", "Cooking", "Travel"],
    avatar:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    id: 2,
    name: "James Chen",
    age: 24,
    location: "Manchester",
    occupation: "Graphic Designer",
    budget: "£700 – £900",
    interests: ["Gaming", "Music", "Art"],
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    age: 25,
    location: "Bristol",
    occupation: "Marketing Manager",
    budget: "£900 – £1,200",
    interests: ["Running", "Photography", "Wine"],
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    id: 4,
    name: "Michael Thompson",
    age: 28,
    location: "Leeds",
    occupation: "Data Analyst",
    budget: "£950 – £1,300",
    interests: ["Sports", "Hiking", "Cooking"],
    avatar:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    id: 5,
    name: "Jessica Williams",
    age: 23,
    location: "Birmingham",
    occupation: "Student",
    budget: "£500 – £700",
    interests: ["Books", "Coffee", "Art"],
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    id: 6,
    name: "David Kim",
    age: 27,
    location: "London",
    occupation: "Product Manager",
    budget: "£1,200 – £1,600",
    interests: ["Tech", "Travel", "Fitness"],
    avatar:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
];

export default function FlatmateFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) =>
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));

  const filteredFlatmates = flatmates.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.occupation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      {/* subtle radial lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.15),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Find Your Flatmate
          </h1>
          <p className="text-slate-400">
            Connect with compatible people looking for shared housing
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, location, or occupation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFlatmates.map((f) => (
            <div
              key={f.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-blue-500/10 hover:border-blue-500/40 transition duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleFavorite(f.id)}
                  className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites[f.id]
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }`}
                  />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-1">
                  {f.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{f.age} years old</p>

                <div className="space-y-3 mb-6 pb-6 border-b border-slate-800">
                  <div className="flex items-center text-slate-300">
                    <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                    <span className="text-sm">{f.location}</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Briefcase className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">{f.occupation}</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Tag className="w-4 h-4 mr-2 text-pink-400" />
                    <span className="text-sm">{f.budget}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-slate-400 text-xs mb-2">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {f.interests.map((int, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium"
                      >
                        {int}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-lg shadow-md shadow-blue-500/20 transition flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </button>
                  <button className="py-2 px-4 border border-slate-700 text-slate-300 hover:bg-slate-800 rounded-lg transition flex items-center justify-center">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFlatmates.length === 0 && (
          <div className="text-center py-20">
            <User className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">
              No flatmates found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
