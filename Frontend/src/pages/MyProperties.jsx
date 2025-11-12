import { useEffect, useState } from "react";
import "./MyProperties.css";
import { fetchMine } from "../api/propertyApi";
import axios from "axios";
import { getAuthHeader } from "../utils/auth";

export default function MyProperties() {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    rent: "",
    propertyType: "",
    furnished: false,
    availableFrom: "",
    contactNumber: "",
    maxOccupancy: "",
  });

  const loadProperties = async () => {
    try {
      const data = await fetchMine();
      setList(data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load your properties");
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const openAddModal = () => {
    setEditId(null);
    setForm({
      title: "",
      description: "",
      address: "",
      city: "",
      rent: "",
      propertyType: "",
      furnished: false,
      availableFrom: "",
      contactNumber: "",
      maxOccupancy: "",
    });
    setShowModal(true);
  };

  const openEditModal = (property) => {
    setEditId(property.id);
    setForm({
      title: property.title || "",
      description: property.description || "",
      address: property.address || "",
      city: property.city || "",
      rent: property.rent || "",
      propertyType: property.propertyType || "",
      furnished: property.furnished || false,
      availableFrom: property.availableFrom || "",
      contactNumber: property.contactNumber || "",
      maxOccupancy: property.maxOccupancy || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update existing property
        await axios.put(`http://localhost:8084/properties/${editId}`, form, {
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
        });
      } else {
        // Add new property
        await axios.post("http://localhost:8084/properties", form, {
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
        });
      }
      setShowModal(false);
      await loadProperties();
    } catch (err) {
      console.error(err);
      alert(editId ? "Failed to update property" : "Failed to add property");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;
    try {
      await axios.delete(`http://localhost:8084/properties/${id}`, {
        headers: { ...getAuthHeader() },
      });
      await loadProperties();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
  <div className="myprops-page">
    <div className="myprops-header">
      <h1>My Properties</h1>
      <button className="myprops-add-btn" onClick={openAddModal}>
        + Add Property
      </button>
    </div>

    <div className="myprops-card-grid">
      {list.length === 0 ? (
        <p style={{ color: "#555" }}>You haven’t listed any properties yet.</p>
      ) : (
        list.map((p) => (
          <div key={p.id} className="myprops-card">
            <img
              src="https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=60"
              alt={p.title}
            />
            <h3>{p.title}</h3>
            <p>{p.city}</p>
            <p>{p.address}</p>
            <p>Rent: ₹{p.rent}</p>
            <div className="myprops-card-actions">
              <button className="myprops-edit" onClick={() => openEditModal(p)}>
                Edit
              </button>
              <button className="myprops-delete" onClick={() => handleDelete(p.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>

    {showModal && (
      <div className="myprops-modal-backdrop" onClick={() => setShowModal(false)}>
        <div className="myprops-modal" onClick={(e) => e.stopPropagation()}>
          <h2>{editId ? "Edit Property" : "Add Property"}</h2>
          <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
            <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
            <input name="rent" type="number" placeholder="Rent" value={form.rent} onChange={handleChange} required />
            <input name="propertyType" placeholder="Property Type" value={form.propertyType} onChange={handleChange} required />
            <label>
              <input type="checkbox" name="furnished" checked={form.furnished} onChange={handleChange} /> Furnished
            </label>
            <input type="date" name="availableFrom" value={form.availableFrom} onChange={handleChange} required />
            <input name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} required />
            <input name="maxOccupancy" type="number" placeholder="Max Occupancy" value={form.maxOccupancy} onChange={handleChange} required />

            <div className="modal-buttons">
              <button type="submit" className="myprops-submit">
                {editId ? "Update" : "Add Property"}
              </button>
              <button type="button" className="myprops-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);

}
