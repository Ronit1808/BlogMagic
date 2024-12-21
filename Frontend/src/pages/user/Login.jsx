import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../components/context/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext); // Access loginUser from AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      await loginUser(username, password); // Use loginUser from AuthContext
      navigate("/"); // Redirect to homepage on successful login
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#2b2779] p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-white text-center">
          Welcome Back!
        </h1>
        <p className="mt-2 text-gray-300 text-center">
          Login to your BlogMagic account to continue.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state
              className="w-full mt-1 px-4 py-2 text-black bg-slate-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="w-full mt-1 px-4 py-2 text-black bg-slate-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-700 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg text-lg shadow-lg transition duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>

        {/* Forgot Password */}
        <p className="mt-6 text-center text-gray-300">
          <a
            href="/forgot-password"
            className="text-indigo-500 hover:text-indigo-400"
          >
            Forgot your password?
          </a>
        </p>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-300">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-500 hover:text-indigo-400">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
