import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/'
// Set up the base URL for your backend API
const api = axios.create({
  baseURL: baseURL, // Replace with your actual backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the Authorization header with the access token
api.interceptors.request.use(
  (config) => {
    const authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    if (authTokens?.access) {
      config.headers["Authorization"] = `Bearer ${authTokens.access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
