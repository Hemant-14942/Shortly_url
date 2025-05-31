import React, { useState } from "react";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Shorten = () => {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const { user } = useAuth();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/url/shorten", {
        url,
        shortcode: customCode || undefined,
      });

      // Handle duplicate shortcode message
      if (res.data.message === "Shortcode already exists") {
        alert("Custom shortcode already exists. Please try another one.");
        return;
      }

      setShortUrl(res.data.shortUrl);

      // Clear form after successful submission
      setUrl("");
      setCustomCode("");
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
      setShortUrl(
        "Error: " + (err.response?.data?.message || "Could not shorten URL")
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-16 pb-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Shorten Your URL</h2>
        <h2 className="text-2xl text-blue-400 font-semibold text-center">
          Hi 👋 {user?.username}
        </h2>

        {/* Input for the long URL */}
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here"
          className="w-full border p-3 rounded"
          required
        />

        {/* Input for custom short code */}
        <input
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          placeholder="Enter your custom short code (optional)"
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Shorten
        </button>
      </form>

      {/* Display newly created short URL */}
      {shortUrl && !shortUrl.startsWith("Error:") && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-800 p-3 rounded w-full max-w-lg">
          <p className="font-semibold">New Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700 break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}

      {/* Display error message */}
      {shortUrl && shortUrl.startsWith("Error:") && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-800 p-3 rounded w-full max-w-lg">
          {shortUrl}
        </div>
      )}

      {/* Link to Dashboard */}
      <div className="mt-8 w-full max-w-lg text-center">
        <Link
          to="/dashboard"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          View All My Shortened URLs
        </Link>
      </div>
    </div>
  );
};

export default Shorten;
