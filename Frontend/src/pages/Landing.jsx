// src/pages/Landing.jsx
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>🏠 Flat Hunter</h1>
        <div style={styles.headerButtons}>
          <button style={styles.btnOutline} onClick={() => navigate("/login")}>
            Log In
          </button>
          <button style={styles.btnPrimary} onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <h2 style={styles.heading}>
          Find Your Perfect Flat or List Yours Easily
        </h2>
        <p style={styles.text}>
          A seamless platform for renters and owners. Discover verified flats,
          book rooms, or list your property — all in one place.
        </p>

        <div style={styles.actions}>
          <button
            style={styles.btnOutline}
            onClick={() => navigate("/properties")}
          >
            🏘️ View Properties
          </button>
          <button
            style={styles.btnOutlineAlt}
            onClick={() => navigate("/login")}
          >
            🏢 List Your Property
          </button>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2025 Flat Hunter | NITK Project</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#f7f7f7",
    borderBottom: "1px solid #ddd",
  },
  headerButtons: {
    display: "flex",
    gap: "1rem", // ✅ adds space between login & signup buttons
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.6rem",
    color: "#0078ff",
  },
  main: {
    flex: 1,
    textAlign: "center",
    padding: "4rem 2rem",
  },
  heading: {
    fontSize: "2.2rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.1rem",
    maxWidth: "600px",
    margin: "0 auto 2.5rem",
    lineHeight: "1.6",
    color: "#555",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btnPrimary: {
    backgroundColor: "#0078ff",
    color: "#fff",
    border: "none",
    padding: "0.8rem 1.6rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.3s ease",
  },
  btnOutline: {
    backgroundColor: "transparent",
    border: "1px solid #0078ff",
    color: "#0078ff",
    padding: "0.8rem 1.6rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  },
  btnOutlineAlt: {
    backgroundColor: "transparent",
    border: "1px solid #555",
    color: "#555",
    padding: "0.8rem 1.6rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  },
  footer: {
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#f7f7f7",
    borderTop: "1px solid #ddd",
  },
};
