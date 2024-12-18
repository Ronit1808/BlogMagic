import axios from "axios";

// Set up the base URL for your backend API
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Replace with your actual backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api