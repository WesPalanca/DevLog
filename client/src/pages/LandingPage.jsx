import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";

const LandingPage = () => {
  const { nightMode, setNightMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem("nightMode", nightMode);
  }, [nightMode]);

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-300 ${
        nightMode ? "bg-[#0d1117] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`flex items-center justify-between px-8 py-4 shadow-md ${
          nightMode ? "bg-[#161b22]" : "bg-gray-100"
        }`}
      >
        <h1 className="text-2xl font-bold tracking-wide cursor-default select-none">
          DevLog
        </h1>

        <button
          onClick={() => setNightMode((prev) => !prev)}
          className={`px-3 py-1 rounded-full font-semibold transition ${
            nightMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          {nightMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h2
          className={`text-4xl md:text-5xl font-extrabold leading-tight mb-4 ${
            nightMode ? "text-white" : "text-gray-900"
          }`}
        >
          Track Your Dev Journey.
        </h2>
        <p
          className={`text-lg md:text-xl max-w-2xl mb-8 ${
            nightMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Log your daily coding progress, set goals, and stay accountable—all in one place.
        </p>
        <Link to="/auth">
          <button
            className={`px-8 py-3 text-lg rounded-full font-semibold transition transform hover:scale-105 shadow-lg ${
              nightMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Get Started Free
          </button>
        </Link>
      </main>
    </div>
  );
};

export default LandingPage;
