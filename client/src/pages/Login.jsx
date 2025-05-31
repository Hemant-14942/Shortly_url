import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Uncomment this line if you have AuthContext
// import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Adding loading state
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when typing again
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      await axios.post("/api/user/login", form, {
        withCredentials: true,
      });

      // Fetch user data after successful login
      const me = await axios.get("/api/user/me", {
        withCredentials: true,
      });
      
      if (me.data && me.data.user) {
        setUser(me.data.user);
        navigate("/shorten");
      } else {
        setError("Login successful but failed to get user data");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
