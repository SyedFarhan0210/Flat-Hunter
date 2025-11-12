import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyProperties from "./pages/MyProperties";
import Landing from "./pages/Landing";
import BrowseProperties from "./pages/BrowseProperties";
import PropertyDetails from "./pages/PropertyDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBookings from "./pages/MyBookings";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* public */}
        <Route path="/" element={<Landing/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/properties" element={<BrowseProperties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />

        {/* protected */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-properties"
          element={
            <ProtectedRoute>
              <MyProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-properties/:id"
          element={
            <ProtectedRoute>
              <PropertyDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
