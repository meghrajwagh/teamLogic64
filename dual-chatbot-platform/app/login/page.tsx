"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", { // Corrected login endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        localStorage.setItem("authToken", data.access_token); // Store token in localStorage
        alert("Login successful!");

        router.push("/"); // Redirect to homepage after login
      } else {
        alert("Login failed: " + (data.detail || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2 bg-gray-800 text-white"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password Input with Toggle */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4 bg-gray-800 text-white pr-10"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* Eye Button */}
          <button
            type="button"
            className="absolute right-2 top-2 text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "🙈"}
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>

        {/* Signup Option */}
        <p className="mt-3 text-center">
          Don't have an account? <a href="#" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;