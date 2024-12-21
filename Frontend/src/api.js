import axios from "axios";


// Set up the base URL for your backend API
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Replace with your actual backend base URL
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

// Add an interceptor to handle token refresh if the access token has expired
api.interceptors.response.use(
  (response) => response, // Simply return the response if it's successful
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 && // Unauthorized error
      !originalRequest._retry // Avoid infinite retry loop
    ) {
      originalRequest._retry = true; // Mark this request as a retry attempt

      try {
        const authTokens = localStorage.getItem("authTokens")
          ? JSON.parse(localStorage.getItem("authTokens"))
          : null;

        if (authTokens?.refresh) {
          // Attempt to refresh the token
          const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
            refresh: authTokens.refresh,
          });

          // Update tokens in localStorage
          const updatedTokens = response.data;
          localStorage.setItem("authTokens", JSON.stringify(updatedTokens));

          // Retry the original request with the new access token
          originalRequest.headers["Authorization"] = `Bearer ${updatedTokens.access}`;
          return api(originalRequest);
        }
      } catch (tokenRefreshError) {
        console.error("Token refresh failed:", tokenRefreshError);
        localStorage.removeItem("authTokens"); // Clear tokens if refresh fails
        window.location.href = "/login"; // Redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
