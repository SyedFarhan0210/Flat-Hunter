import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api", // change if your backend port differs
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
