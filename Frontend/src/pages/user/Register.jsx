import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Register = () => {

  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userInfo = { username, password, email };

    try {
      const res = await api.post("signup/", userInfo);
      if (res.status === 201) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create account");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-slate-100 p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Heading */}
        <h1 className="text-3xl font-bold  text-center">
          Create Your Account
        </h1>
        <p className="mt-2 text-center">
          Join BlogMagic and start your blogging journey!
        </p>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-600 rounded-md text-sm">
            {success}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="username" className="block text-sm ">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full mt-1 px-4 py-2 text-black bg-slate-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm ">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-4 py-2 text-black bg-slate-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm ">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 px-4 py-2 text-black bg-slate-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm "
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full mt-1 px-4 py-2 text-black bg-slate-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg text-lg shadow-lg transition duration-300 transform hover:scale-105"
            >
              Register Now
            </button>
          </div>
        </form>

        {/* Already have an account */}
        <p className="mt-6 text-center ">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 hover:text-indigo-400">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
