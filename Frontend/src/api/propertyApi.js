import axios from "axios";
import { getAuthHeader } from "../utils/auth";

const BASE = "http://localhost:8084";

export async function fetchMine() {
  return axios.get(`${BASE}/properties/mine`, {
    headers: { ...getAuthHeader() },
  }).then(r => r.data);
}

export async function fetchAll() {
  return axios.get(`${BASE}/properties`).then(r => r.data);
}

export async function fetchByCity(city) {
  return axios.get(`${BASE}/properties/city/${encodeURIComponent(city)}`)
    .then(r => r.data);
}

export async function fetchByAddress(q) {
  return axios.get(`${BASE}/properties/address/${encodeURIComponent(q)}`)
    .then(r => r.data);
}

export async function updateProperty(id, body) {
  return axios.put(`${BASE}/properties/${id}`, body, {
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
  }).then(r => r.data);
}

export async function deleteProperty(id) {
  return axios.delete(`${BASE}/properties/${id}`, {
    headers: { ...getAuthHeader() },
  }).then(r => r.data);
}
