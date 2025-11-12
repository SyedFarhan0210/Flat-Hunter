/**import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}**/

// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import Header from "./Header";
import Footer from "./Footer";

export default function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="protected-content">{children}</div>
      <Footer />
    </>
  );
}

