import { LogOut, Menu, Home, Users, Settings, Building2, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 transition-all duration-300 flex flex-col`}
      >
        <div className="p-5 border-b border-slate-700 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          {sidebarOpen && <h1 className="text-lg font-semibold text-blue-400">Flat Hunter</h1>}
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-2">
          <button
            className="flex items-center space-x-3 px-4 py-3 w-full bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition"
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Dashboard</span>}
          </button>

          <button
            className="flex items-center space-x-3 px-4 py-3 w-full text-slate-300 hover:bg-slate-700 rounded-lg transition"
          >
            <Building2 className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Properties</span>}
          </button>

          <button
            className="flex items-center space-x-3 px-4 py-3 w-full text-slate-300 hover:bg-slate-700 rounded-lg transition"
          >
            <Users className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Flatmates</span>}
          </button>

          <button
            className="flex items-center space-x-3 px-4 py-3 w-full text-slate-300 hover:bg-slate-700 rounded-lg transition"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Settings</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-700 to-blue-700 border-b border-slate-700 px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <MessageSquare className="w-5 h-5 text-blue-300 mr-2" />
                <span className="text-sm text-blue-100">Messages</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">VK</span>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-auto p-8 bg-slate-950">
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Listings</p>
                  <p className="text-3xl font-bold text-white mt-2">8</p>
                </div>
                <Building2 className="w-12 h-12 text-blue-500 opacity-20" />
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Saved Flatmates</p>
                  <p className="text-3xl font-bold text-white mt-2">12</p>
                </div>
                <Users className="w-12 h-12 text-cyan-500 opacity-20" />
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">New Messages</p>
                  <p className="text-3xl font-bold text-white mt-2">5</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md shadow-slate-900/30">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-3">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-b border-slate-700 last:border-b-0"
                >
                  <div>
                    <p className="text-white font-medium">Activity item {i}</p>
                    <p className="text-slate-400 text-sm">2 hours ago</p>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
