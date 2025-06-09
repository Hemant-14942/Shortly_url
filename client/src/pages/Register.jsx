import { useState } from "react";
import axios from "../services/api"; // Keep using your axios service
import { useNavigate } from "react-router-dom"; // Keep using useNavigate
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const { setUser } = useAuth();
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
    // console.log("form handleSubmit k andr aa gya");
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // console.log(form);
    
    try {
      // console.log("try k andr aa gya");
      const loginResponse = await axios.post("/api/user/register", form, {
        withCredentials: true,
      });
      // console.log("loginResponse--->", loginResponse);

      if (loginResponse.status === 201) {
        // Fetch user data after successful login
        // console.log("/me roue chlane wal ahu");
        
        const me = await axios.get("/api/user/me", {
          withCredentials: true,
        });
        // console.log("/me roue chlali h chekc kr");

        if (me.data && me.data.user) {
          setUser(me.data.user);
          // console.log("me.data.user---> set krdiya user m", me.data.user);
          navigate("/");
        } else {
          setError("Login successful but failed to get user data");
          toast.error("Login successful but failed to get user data")
        }
      }
    } catch (err) {
        console.error("Login error:", err);
        const msg = err.response?.data?.message || "Something went wrong!";
        toast.error(`🚫 ${msg}`);
        setError(msg);
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
        <h2 className="text-xl font-bold">Register</h2>

        {/* {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )} */}

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
