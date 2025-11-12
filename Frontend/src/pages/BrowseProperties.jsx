import { useEffect, useState } from "react";
import { fetchAll, fetchByCity, fetchByAddress } from "../api/propertyApi";
import "./BrowseProperties.css";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../api/bookingApi";
import { getToken } from "../utils/auth"; // ✅ import token checker

export default function BrowseProperties() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [addr, setAddr] = useState("");
  const [selected, setSelected] = useState(null); // View details modal
  const [confirmP, setConfirmP] = useState(null); // Book confirm modal
  const [banner, setBanner] = useState("");       // Success/info banner
  const navigate = useNavigate();

  // Load all properties
  const loadAll = async () => {
    try {
      setLoading(true);
      const data = await fetchAll();
      setList(data || []);
    } catch (e) {
      console.error(e);
      alert("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const runFilters = async () => {
    try {
      setLoading(true);
      if (city.trim()) {
        setList(await fetchByCity(city.trim()));
      } else if (addr.trim()) {
        setList(await fetchByAddress(addr.trim()));
      } else {
        await loadAll();
      }
    } catch (e) {
      console.error(e);
      alert("Filter failed");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = async () => {
    setCity("");
    setAddr("");
    await loadAll();
  };

  // ✅ Booking confirmation + navigation to MyBookings
  const handleConfirmBooking = async () => {
    if (!confirmP) return;
    try {
      await createBooking(confirmP.id);
      setBanner("🎉 Booking confirmed!");
      setTimeout(() => {
        setBanner("");
        navigate("/bookings"); // ✅ Go to MyBookings page after success
      }, 1500);
    } catch (e) {
      console.error(e);
      alert("Booking failed");
    } finally {
      setConfirmP(null);
    }
  };

  // ✅ Handle booking click: check token before proceeding
  const handleBookClick = (property) => {
    const token = getToken();
    if (!token) {
      alert("Please log in to book a property!");
      navigate("/login");
      return;
    }
    setConfirmP(property); // open booking confirmation modal
  };

  return (
    <div className="browse-page">
      <header className="browse-header">
        <h1>Explore Available Properties</h1>
        <p className="subtitle">Find your ideal flat in seconds!</p>
      </header>

      {banner && <div className="banner-success">{banner}</div>}

      <div className="filter-box">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Filter by city"
        />
        <input
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          placeholder="Filter by address"
        />
        <button onClick={runFilters} className="apply">
          Apply
        </button>
        <button onClick={clearFilters} className="clear">
          Clear
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading properties...</p>
      ) : list.length === 0 ? (
        <div className="no-results">
          <p>No properties found. Try adjusting filters!</p>
        </div>
      ) : (
        <div className="property-grid">
          {list.map((p) => (
            <div key={p.id} className="property-card">
              <img
                src="https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=900&q=60"
                alt={p.title}
              />
              <h3>{p.title}</h3>
              <p className="city">{p.city}</p>
              <p className="address">{p.address}</p>
              <p className="rent">₹{p.rent}/month</p>
              <div className="actions">
                <button className="view" onClick={() => setSelected(p)}>
                  View Details
                </button>
                <button className="book" onClick={() => handleBookClick(p)}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🏠 View Details Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="property-modal" onClick={(e) => e.stopPropagation()}>
            <img
              src="https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=900&q=60"
              alt={selected.title}
              className="modal-img"
            />
            <h2>{selected.title}</h2>
            <p><strong>City:</strong> {selected.city}</p>
            <p><strong>Address:</strong> {selected.address}</p>
            <p><strong>Description:</strong> {selected.description}</p>
            <p><strong>Rent:</strong> ₹{selected.rent} / month</p>
            <p><strong>Type:</strong> {selected.propertyType}</p>
            <p><strong>Furnished:</strong> {selected.furnished ? "Yes" : "No"}</p>
            <p><strong>Available From:</strong> {selected.availableFrom}</p>
            <p><strong>Max Occupancy:</strong> {selected.maxOccupancy}</p>
            <p><strong>Contact:</strong> {selected.contactNumber}</p>

            <div className="modal-buttons">
              <button
                className="book"
                onClick={() => {
                  handleBookClick(selected);
                  setSelected(null);
                }}
              >
                Book Now
              </button>
              <button className="close" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Book Confirm Modal */}
      {confirmP && (
        <div className="modal-overlay" onClick={() => setConfirmP(null)}>
          <div className="property-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Booking?</h2>
            <p><strong>{confirmP.title}</strong></p>
            <p>{confirmP.address}, {confirmP.city}</p>
            <p>Rent: ₹{confirmP.rent}/month</p>
            <div className="modal-buttons">
              <button className="book" onClick={handleConfirmBooking}>
                Confirm
              </button>
              <button className="close" onClick={() => setConfirmP(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
