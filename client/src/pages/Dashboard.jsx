import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";
import { backendUrl } from "../assets/constants";
import { Link } from "react-router-dom";
import { BarChart3, Link2, Clock, ExternalLink } from "lucide-react";

const Dashboard = () => {
  const [userUrls, setUserUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Function to fetch user URLs
  const fetchUserUrls = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/url/getuserurls", {
        withCredentials: true,
      });
      setUserUrls(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch user URLs:", err.response?.data || err.message);
      setError("Failed to load your URLs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch URLs when component mounts
  useEffect(() => {
    fetchUserUrls();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, <span className="font-medium text-blue-600">{user?.username}</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/shorten"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Link2 className="h-4 w-4 mr-2" />
                Create New Short Link
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Link2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Total Links</p>
                <p className="text-2xl font-bold text-gray-900">{userUrls.length}</p>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-600">Latest Link</p>
                <p className="text-lg font-bold text-gray-900 truncate max-w-[180px]">
                  {userUrls.length > 0 ? userUrls[userUrls.length - 1].shortcode : "None"}
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">Account Status</p>
                <p className="text-lg font-bold text-gray-900">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* URL List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Your Shortened URLs</h2>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-2 text-gray-600">Loading your URLs...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">{error}</div>
          ) : userUrls.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-4">You haven't created any short URLs yet.</p>
              <Link
                to="/shorten"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Create Your First Short Link
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Original URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Short URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userUrls.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 truncate max-w-[250px]" title={item.url}>
                          {item.url.length > 40 ? item.url.substring(0, 40) + "..." : item.url}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={`${backendUrl}/api/url/${item.shortcode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          {item.shortcode}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(item.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <a
                          href={`${backendUrl}/api/url/${item.shortcode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 mr-4"
                        >
                          Visit
                        </a>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Original
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;