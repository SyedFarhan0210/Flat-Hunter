import axios from "./axiosClient";

export const signupUser = (data) => axios.post("/auth/signup", data);
export const loginUser = (data) => axios.post("/auth/login", data);
