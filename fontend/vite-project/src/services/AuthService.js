import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/api/auth";

export const registerAPICall = (registerObj) =>
  axios.post(BASE_REST_API_URL + "/register", registerObj);

export const loginAPICall = (usernameOrEmail, password) =>
  axios.post(BASE_REST_API_URL + "/login", { usernameOrEmail, password });

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username, role) => {
  sessionStorage.setItem("authenticatedUser", username);
  sessionStorage.setItem("role", role);
};

export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return username !== null;
};

export const getLoggedInUser = () =>
  sessionStorage.getItem("authenticatedUser");

export const logout = () => {
  sessionStorage.clear();
  localStorage.clear();
  // window.location.reload(false);
};

export const isAdminUser = () => {
  let role = sessionStorage.getItem("role");

  if (role != null && role === "ROLE_ADMIN") {
    return true;
  } else return false;
};
