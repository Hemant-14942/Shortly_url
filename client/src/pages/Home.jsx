import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Link as LinkIcon,
  Zap,
  Shield,
  BarChart3,
  Code,
  Database,
  Globe,
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Shorten Your Links,
            <br />
            <span className="text-blue-600">Expand Your Reach</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform long, unwieldy URLs into clean, shareable links. Track
            clicks, manage your links, and make your content more accessible
            with Shortly.
          </p>

          {user ? (
            <Link to="/shorten">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg">
                Create Short Link
              </button>
            </Link>
          ) : (
            <div className="space-x-4">
              <Link to="/shorten">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg">
                  Get Started
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition duration-200">
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Shortly?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Generate short links instantly with our optimized backend
                powered by Node.js and Express.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your links are safely stored in MongoDB with robust security
                measures and 99.9% uptime.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics Ready</h3>
              <p className="text-gray-600">
                Track click statistics and monitor your link performance with
                detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How to Use Shortly
          </h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Paste Your Long URL
                </h3>
                <p className="text-gray-600">
                  Simply paste any long URL into our shortener tool. No
                  registration required for basic usage.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Get Your Short Link
                </h3>
                <p className="text-gray-600">
                  Instantly receive a shortened URL that's easy to share and
                  remember.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Share & Track</h3>
                <p className="text-gray-600">
                  Share your short link anywhere and track its performance with
                  our analytics dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Built with Modern Technology
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Node.js</h3>
              <p className="text-gray-600 text-sm">
                Powerful JavaScript runtime for fast server-side processing
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Express.js</h3>
              <p className="text-gray-600 text-sm">
                Lightweight web framework for robust API development
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">MongoDB</h3>
              <p className="text-gray-600 text-sm">
                Scalable NoSQL database for efficient data storage
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LinkIcon className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">React</h3>
              <p className="text-gray-600 text-sm">
                Modern frontend library for seamless user experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Shortening?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust Shortly for their link management
            needs.
          </p>
          {!user && (
            <div className="space-x-4">
              <Link to="/register">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-200">
                  Sign Up Free
                </button>
              </Link>
              <Link to="/shorten">
                <button className="bg-transparent text-white px-8 py-4 rounded-lg text-lg font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition duration-200">
                  Try Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <LinkIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Shortly</span>
          </div>
          <p className="text-gray-400">
            © 2025 Shortly. Built with ❤️ using Node.js, Express, MongoDB, and
            React.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
