import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="ml-2">Checking authentication...</p>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!user) return <Navigate to="/login" />;
  
  // Render the protected content if authenticated
  return children;
};

export default ProtectedRoute;
