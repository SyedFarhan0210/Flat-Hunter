import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PropertyList from "./pages/PropertyList";
import PropertyDetails from "./pages/PropertyDetails";
import Bookings from "./pages/Bookings";
import FlatmateFinder from "./pages/FlatmateFinder";
import PaymentPage from "./pages/PaymentPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (no Navbar/Footer) */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes with Navbar + Footer */}
        <Route
          element={
            <>
              <Navbar />
              <ProtectedRoute />
              <Footer />
            </>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/flatmates" element={<FlatmateFinder />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
