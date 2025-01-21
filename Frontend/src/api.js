import axios from "axios";

const baseURL =  'https://blogmagic-production.up.railway.app/api';
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

// 'https://blogmagic.onrender.com/api' ||