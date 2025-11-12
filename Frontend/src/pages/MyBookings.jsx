import { useEffect, useState } from "react";
import { fetchMyBookings, cancelBooking } from "../api/bookingApi";
import axios from "axios";
import "./MyBookings.css";
import { getAuthHeader } from "../utils/auth";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [confirmItem, setConfirmItem] = useState(null);
  const [banner, setBanner] = useState("");

  // Fetch user bookings
  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await fetchMyBookings();
      setBookings(data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Fetch property details dynamically when viewing details
  const viewDetails = async (booking) => {
    try {
      const res = await axios.get(`http://localhost:8084/properties/${booking.propertyId}`, {
        headers: { ...getAuthHeader() },
      });
      setSelectedBooking({ ...booking, property: res.data });
    } catch (err) {
      console.error(err);
      alert("Failed to load property details");
    }
  };

  // Handle booking cancellation
  const handleCancel = async () => {
    if (!confirmItem) return;
    try {
      await cancelBooking(confirmItem.id);
      setBookings((prev) => prev.filter((b) => b.id !== confirmItem.id));
      setBanner("Booking cancelled successfully!");
      setTimeout(() => setBanner(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    } finally {
      setConfirmItem(null);
    }
  };

  return (
    <div className="bookings-page">
      <header className="bookings-header">
        <h1>My Bookings</h1>
        <p className="subtitle">Manage all your reservations with ease ✨</p>
      </header>

      {banner && <div className="banner-success">{banner}</div>}

      {loading ? (
        <p className="loading">Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <div className="no-results">
          <p>You haven’t booked any properties yet.</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <img
                src="https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=900&q=60"
                alt="Property"
              />
              <div className="info">
                <h3>{b.propertyTitle || `Booking ${b.id}`}</h3>
                <p className="meta">Booked by: {b.userEmail}</p>
                <p className="meta">Booking ID: {b.id}</p>
              </div>
              <div className="actions">
                <button className="view" onClick={() => viewDetails(b)}>
                  View Details
                </button>
                <button className="cancel" onClick={() => setConfirmItem(b)}>
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🏠 Property Details Modal */}
      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="property-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedBooking.property?.title || "Property Details"}</h2>
            <p><strong>City:</strong> {selectedBooking.property?.city}</p>
            <p><strong>Address:</strong> {selectedBooking.property?.address}</p>
            <p><strong>Rent:</strong> ₹{selectedBooking.property?.rent}</p>
            <p><strong>Type:</strong> {selectedBooking.property?.propertyType}</p>
            <p><strong>Furnished:</strong> {selectedBooking.property?.furnished ? "Yes" : "No"}</p>
            <p><strong>Available From:</strong> {selectedBooking.property?.availableFrom}</p>
            <p><strong>Contact:</strong> {selectedBooking.property?.contactNumber}</p>
            <button className="close" onClick={() => setSelectedBooking(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ❌ Cancel Booking Modal */}
      {confirmItem && (
        <div className="modal-overlay" onClick={() => setConfirmItem(null)}>
          <div className="property-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Cancel Booking</h2>
            <p>
              Are you sure you want to cancel your booking for{" "}
              <strong>{confirmItem.propertyTitle || `#${confirmItem.id}`}</strong>?
            </p>
            <div className="modal-buttons">
              <button className="confirm" onClick={handleCancel}>
                Confirm
              </button>
              <button className="close" onClick={() => setConfirmItem(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
