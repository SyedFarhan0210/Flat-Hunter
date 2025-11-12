import axios from "axios";
import { getToken } from "../utils/auth";

const api = axios.create({
  baseURL: "http://localhost:8081", // base for auth-service
});

// attach token to every request except signup/login
api.interceptors.request.use((config) => {
  const token = getToken();
  if (
    token &&
    !config.url.includes("/api/auth/signup") &&
    !config.url.includes("/api/auth/login")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
