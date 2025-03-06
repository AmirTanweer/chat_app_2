import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

const AuthState = ({ children }) => {
  const url = "http://localhost:5000/";

  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [loggedIn, setLoggedIn] = useState(!!token);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    console.log("📦 Token in sessionStorage:", storedToken); // Debugging
    if (storedToken && !userData) { 
      console.log("📢 Token found, fetching user details...");
      setToken(storedToken);
      getUserDetails();
    }
  }, []); // Runs on mount

  const SignUp = async (formData) => {
    try {
      const response = await axios.post(`${url}api/auth/register`, {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.message || "Registration failed" };
    }
  };

  const Logging = async (formData) => {
    try {
      const response = await axios.post(`${url}api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });
      console.log('token -> ',response.data.token)

      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setLoggedIn(true);

        
      

        return { success: true, token: response.data.token };
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const LogOut = () => {
    sessionStorage.clear(); // Clear all session storage
    setToken("");
    setLoggedIn(false);
    setUserData(null);
  };

  const getUserDetails = async () => {
    const storedToken = sessionStorage.getItem("token") || token; // Fallback to session storage if token state is empty
    if (!storedToken) {
      console.log("🚨 No token found, skipping API call");
      return null; // Ensure explicit return
    }
  
    try {
      console.log("🟢 Fetching user details with token:", storedToken); // Debugging
      const response = await axios.get(`${url}api/auth/getuserdetails`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });
  
      console.log("✅ User details received:", response.data.user);
      setUserData(response.data.user);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching user details:", error.response?.data || error.message);
      return null;
    }
  };
  

  return (
    <AuthContext.Provider value={{ SignUp, Logging, LogOut, loggedIn, userData, token,getUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
