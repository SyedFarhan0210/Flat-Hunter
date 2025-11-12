import { Link, useNavigate } from "react-router-dom";
import "./HeaderFooter.css";
import { removeToken, getToken } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-left" onClick={() => navigate("/home")}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2838/2838912.png"
          alt="logo"
          className="logo"
        />
        <h2 className="brand">Flat Hunter</h2>
      </div>

      <nav className="nav-links">
        <Link to="/properties">Browse</Link>
        <Link to="/my-properties">My Properties</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/profile">My Profile</Link>
      </nav>

      {token ? (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </header>
  );
}
