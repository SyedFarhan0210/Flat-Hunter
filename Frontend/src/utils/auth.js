import Cookies from "js-cookie";

const TOKEN_KEY = "jwt_token";

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 1, // 1 day
    secure: false, // true if you use https
    sameSite: "Lax",
  });
};

export const getToken = () => Cookies.get(TOKEN_KEY);

export const removeToken = () => Cookies.remove(TOKEN_KEY);

export const isAuthenticated = () => !!getToken();

export const getAuthHeader = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};
