// src/pages/NotFound.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <h1 className="text-6xl font-extrabold text-blue-300 drop-shadow-md mb-4 animate-pulse">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-lg md:text-xl text-blue-200 mb-8 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/home")}
        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
      >
        Go to Home
      </button>
      <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-blue-300">
        <span>Need help?</span>
        <a
          href="/contact"
          className="underline hover:text-blue-400 transition duration-200"
        >
          Contact us
        </a>
      </div>
    </div>
  );
}
