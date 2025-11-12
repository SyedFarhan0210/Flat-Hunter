import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const token = getToken();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8083/onboarding", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.log("No existing profile found, enabling create mode");
        setIsEditing(true); // allow creation if 404
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setError("");
      const method = profile?.userEmail ? "put" : "post";
      await axios({
        method,
        url: "http://localhost:8083/onboarding",
        data: profile,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEditing(false);
      alert("Profile saved successfully ✅");
    } catch (err) {
      setError("Failed to save profile. Try again.");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>{isEditing ? "Complete Your Profile" : "Your Profile"}</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-grid">
          <label>Phone:</label>
          <input
            name="phone"
            value={profile?.phone || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Gender:</label>
          <select
            name="gender"
            value={profile?.gender || ""}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Profession:</label>
          <input
            name="profession"
            value={profile?.profession || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>City:</label>
          <input
            name="city"
            value={profile?.city || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Budget Range:</label>
          <input
            name="budgetRange"
            value={profile?.budgetRange || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Preferred Location:</label>
          <input
            name="preferredLocation"
            value={profile?.preferredLocation || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Lifestyle:</label>
          <input
            name="lifestyle"
            value={profile?.lifestyle || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label>Bio:</label>
          <textarea
            name="bio"
            rows="3"
            value={profile?.bio || ""}
            onChange={handleChange}
            disabled={!isEditing}
          ></textarea>
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <button className="save-btn" onClick={handleSubmit}>
              Save
            </button>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
