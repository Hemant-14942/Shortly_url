import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link2, Menu, X, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shorten", label: "Shorten" },
    ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : []),
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
        }`}
        style={{
          animation: "slideDown 0.6s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className={`flex items-center space-x-2 font-bold text-xl transition-all duration-300 hover:scale-105 ${
                isScrolled ? "text-blue-600" : "text-white"
              }`}
              style={{
                animation: "fadeInLeft 0.8s ease-out",
              }}
            >
              <div className="relative">
                <Link2 className="h-8 w-8 transform rotate-45" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <span
                className={`bg-clip-text text-transparent font-extrabold transition-all duration-500 ${
                  isScrolled
                    ? "bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-700"
                    : "bg-gradient-to-r from-white via-red-500 to-yellow-500 animate-pulse"
                }`}
              >
                Shortly
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-white/90 hover:text-white"
                  } ${
                    isActiveLink(link.to)
                      ? isScrolled
                        ? "text-blue-600"
                        : "text-white"
                      : ""
                  }`}
                  style={{
                    animation: `fadeInDown 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {link.label}
                  {isActiveLink(link.to) && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled ? "bg-blue-600" : "bg-white"
                      }`}
                      style={{
                        animation: "expandWidth 0.3s ease-out",
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div
                  className="flex items-center space-x-4"
                  style={{
                    animation: "fadeInRight 0.8s ease-out",
                  }}
                >
                  <div
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                      isScrolled
                        ? "bg-blue-50 text-blue-700"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      isScrolled
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-red-500/90 text-white hover:bg-red-500"
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div
                  className="flex items-center space-x-4"
                  style={{
                    animation: "fadeInRight 0.8s ease-out",
                  }}
                >
                  <Link
                    to="/login"
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      isScrolled
                        ? "text-gray-700 hover:text-blue-600"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      isScrolled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                    }`}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`px-4 pt-2 pb-6 space-y-2 ${
              isScrolled
                ? "bg-white border-t border-gray-200"
                : "bg-blue-700/95 backdrop-blur-sm"
            }`}
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    : "text-white/90 hover:bg-white/20 hover:text-white"
                } ${
                  isActiveLink(link.to)
                    ? isScrolled
                      ? "bg-blue-50 text-blue-600"
                      : "bg-white/20 text-white"
                    : ""
                }`}
                style={{
                  animation: `slideInLeft 0.4s ease-out ${index * 0.1}s both`,
                }}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200/20">
              {user ? (
                <div className="space-y-2">
                  <div
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg ${
                      isScrolled
                        ? "bg-blue-50 text-blue-700"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-left font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                      isScrolled
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white/90 hover:bg-white/20"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                      isScrolled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInLeft {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInRight {
          from {
            transform: translateX(30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
