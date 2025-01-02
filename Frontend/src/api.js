import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/'
const api = axios.create({
  baseURL: baseURL, 
  headers: {
    "Content-Type": "application/json",
  },
});

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
