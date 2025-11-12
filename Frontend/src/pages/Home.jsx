// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Flat with <span>Flat Hunter</span></h1>
          <p>
            Discover, book, and list verified flats and PGs — all in one seamless experience.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/properties")}>
              🔍 Explore Properties
            </button>
            <button className="secondary-btn" onClick={() => navigate("/my-properties")}>
              🏢 List Your Property
            </button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
          alt="Modern apartment"
          className="hero-image"
        />
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Why Choose Flat Hunter?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/906/906175.png" alt="Verified" />
            <h3>Verified Listings</h3>
            <p>Every property is validated to ensure authenticity and safety for our users.</p>
          </div>
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png" alt="Easy Booking" />
            <h3>Quick & Easy Booking</h3>
            <p>Book your dream flat with just a few clicks — no lengthy calls or brokers.</p>
          </div>
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2721/2721276.png" alt="Owner Friendly" />
            <h3>Owner Friendly</h3>
            <p>List your flat for free and manage all your bookings effortlessly in one place.</p>
          </div>
        </div>
      </section>

      {/* PROPERTY CATEGORIES PREVIEW */}
      <section className="categories">
        <h2>Explore Categories</h2>
        <div className="category-grid">
          <div className="category-card">
            <img src="https://imgs.search.brave.com/NUbba6dHX8PmEjW19BaKG3cHI1GZyItwclGkLfsnPp0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYXBh/cnRtZW50LTEzMzkt/eC0xMDUwLXBpY3R1/cmUtYWh6MzlkYTJp/c2Q2YnNiMS5qcGc" alt="1BHK" />
            <h3>1 BHK Flats</h3>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80" alt="2BHK" />
            <h3>2 BHK Apartments</h3>
          </div>
          <div className="category-card">
            <img src="https://imgs.search.brave.com/2jO0HQiA5u0LWRcbmD5tgH5DWo2E7qvGR9l4LAoboQE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTAv/MjM0LzI1Mi9zbWFs/bC9tb2Rlcm4tY296/eS1hcGFydG1lbnQt/aW50ZXJpb3ItbGl2/aW5nLXJvb20td2l0/aC15ZWxsb3ctc29m/YS13aGl0ZS1jb2Zm/ZWUtdGFibGUtYW5k/LXR2LW9uLXdhbGwt/cGFub3JhbWljLXdp/bmRvdy13aXRoLWJl/YXV0aWZ1bC12aWV3/LXRvLXRoZS1jaXR5/LWZyZWUtcGhvdG8u/anBn" alt="PGs" />
            <h3>PGs & Shared Rooms</h3>
          </div>
        </div>
      </section>

      {/* FINAL CTA STRIP */}
      

     
    </div>
  );
}
