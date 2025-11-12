import "./HeaderFooter.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>
        © {new Date().getFullYear()} <strong>Flat Hunter</strong>. Built with ❤️ for smarter living.
      </p>
      <p className="footer-links">
        <a href="#">Privacy Policy</a> | <a href="#">Terms</a> | <a href="#">Contact</a>
      </p>
    </footer>
  );
}
