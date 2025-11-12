// src/api/bookingApi.js
import axios from "axios";
import { getAuthHeader } from "../utils/auth";

const BASE = "http://localhost:8085"; // booking_service

export async function createBooking(propertyId) {
  const res = await axios.post(
    `${BASE}/bookings`,
    { propertyId },
    { headers: { "Content-Type": "application/json", ...getAuthHeader() } }
  );
  return res.data; // Booking
}

export async function fetchMyBookings() {
  const res = await axios.get(`${BASE}/bookings/mine`, {
    headers: { ...getAuthHeader() },
  });
  return res.data; // Booking[]
}

export async function cancelBooking(id) {
  const res = await axios.delete(`${BASE}/bookings/${id}`, {
    headers: { ...getAuthHeader() },
  });
  return res.data; // "Cancelled"
}
