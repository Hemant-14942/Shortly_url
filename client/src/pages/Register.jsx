import { useState } from "react";
import axios from "../services/api"; // Keep using your axios service
import { useNavigate } from "react-router-dom"; // Keep using useNavigate

const Register = () => {
  const [form, setForm] = useState({
    username: "", // Changed from 'name' to 'username' to match backend
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // console.log(form);
    
    try {
      // Send POST request to register the user
       await axios.post("/api/user/register", form);

      // console.log("✅ Registration successful:", response.data);

      // Navigate to login on success
      navigate("/login");
    } catch (error) {
      // Log full error object for debugging (optional)
      // console.error("❌ Registration error:", error.response?.data?.message);

      // Set error message from backend if available, otherwise show fallback
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      // Stop loading spinner or disable button
      setIsLoading(false);
    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold">Register</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border p-2 rounded"
          required
        />
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
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-75"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
