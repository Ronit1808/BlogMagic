import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => 
    localStorage.getItem("authTokens") 
      ? JSON.parse(localStorage.getItem("authTokens")) 
      : null
  );
  const [user, setUser] = useState(() => 
    authTokens ? jwtDecode(authTokens.access) : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      const response = await api.post("/token/", { username, password });
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error; 
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  const updateToken = async () => {
    if (authTokens?.refresh) {
      try {
        const response = await api.post("/token/refresh/", {
          refresh: authTokens.refresh,
        });
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify(response.data));
      } catch (error) {
        console.error("Token refresh failed:", error.response?.data || error.message);
        logoutUser(); 
      }
    } else {
      logoutUser();
    }
  };

  // Automatically refresh tokens before they expire
  useEffect(() => {
    if (authTokens) {
      const decoded = jwtDecode(authTokens.access);
      const expireTime = decoded.exp * 1000 - Date.now();
      if (expireTime > 0) {
        const timeout = setTimeout(updateToken, expireTime - 60000); // Refresh 1 minute before expiration
        return () => clearTimeout(timeout); // Cleanup timeout on unmount or tokens update
      } else {
        updateToken();
      }
    }
  }, [authTokens]);


  useEffect(() => {
    setLoading(false);
  }, []);

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    setAuthTokens, 
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
