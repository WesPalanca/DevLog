import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import axios from 'axios';

const Auth = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { nightMode, setNightMode } = useTheme();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    github: "",
    leetcode: "",
  });

  // State for checkboxes: GitHub and LeetCode usernames same as username by default
  const [useSameGithub, setUseSameGithub] = useState(true);
  const [useSameLeetcode, setUseSameLeetcode] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); 
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        const response = await axios.post(`${apiUrl}/auth/register`, {
          email: formData.email,
          username: formData.username,
          password: formData.password,
          github: useSameGithub ? formData.username : formData.github,
          leetcode: useSameLeetcode ? formData.username : formData.leetcode,
        });

        const { success, message } = response.data;
        if (success) {
          alert("Registration successful!");
          setFormData({
            identifier: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            github: "",
            leetcode: "",
          });
          setUseSameGithub(true);
          setUseSameLeetcode(true);
        } else {
          alert(message || "Registration failed.");
        }

      } else {
        // Login
        const response = await axios.post(`${apiUrl}/auth/login`, {
          identifier: formData.identifier,
          password: formData.password,
        });

        const { success, token, message } = response.data;

        if (success) {
          alert("Login successful!");
          localStorage.setItem("token", token); // store JWT
          setFormData({
            identifier: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            github: "",
            leetcode: "",
          });
          setUseSameGithub(true);
          setUseSameLeetcode(true);
          navigate('/dashboard');
        } else {
          alert(message || "Login failed.");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-300 ${
        nightMode ? "bg-[#0d1117] text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-xl shadow-lg px-8 py-10 transition-all duration-300 ${
          nightMode ? "bg-[#161b22]" : "bg-white"
        }`}
      >
        {/* Tabs */}
        <div
          className={`flex mb-6 border-b ${
            nightMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 text-center font-semibold transition ${
              !isRegister
                ? nightMode
                  ? "border-b-2 border-white text-white"
                  : "border-b-2 border-blue-600 text-blue-600"
                : nightMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 text-center font-semibold transition ${
              isRegister
                ? nightMode
                  ? "border-b-2 border-white text-white"
                  : "border-b-2 border-blue-600 text-blue-600"
                : nightMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        <div className="relative min-h-[360px]">
          {/* Sign In */}
          {!isRegister && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block text-sm font-medium">
                Username or Email
                <input
                  type="text"
                  name="identifier"
                  required
                  value={formData.identifier}
                  onChange={handleChange}
                  className={`w-full mt-1 px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    nightMode
                      ? "bg-[#0d1117] text-white border-gray-700 focus:ring-blue-500"
                      : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-500"
                  }`}
                />
              </label>
              <label className="block text-sm font-medium">
                Password
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full mt-1 px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    nightMode
                      ? "bg-[#0d1117] text-white border-gray-700 focus:ring-blue-500"
                      : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-500"
                  }`}
                />
              </label>
              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </form>
          )}

          {/* Register */}
          {isRegister && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block text-sm font-medium">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full mt-1 px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    nightMode
                      ? "bg-[#0d1117] text-white border-gray-700 focus:ring-blue-500"
                      : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-500"
                  }`}
                />
              </label>
              <label className="block text-sm font-medium">
                Username
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full mt-1 px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    nightMode
                      ? "bg-[#0d1117] text-white border-gray-700 focus:ring-blue-500"
                      : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-500"
                  }`}
                />
              </label>
              <label className="block text-sm font-medium">
                Password
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full mt-1 px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    nightMode
                      ? "bg-[#0d1117] text-white border-gray-700 focus:ring-blue-500"
                      : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-500"
                  }`}
                />
              </label>
              <label className="block text-sm font-medium">
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full mt-1 px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    nightMode
                      ? "bg-[#0d1117] text-white border-gray-700 focus:ring-blue-500"
                      : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-500"
                  }`}
                />
              </label>

              {/* Checkboxes and conditional inputs for GitHub and LeetCode */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sameGithub"
                  checked={useSameGithub}
                  onChange={() => setUseSameGithub(!useSameGithub)}
                  className="h-4 w-4"
                />
                <label htmlFor="sameGithub" className="text-sm cursor-pointer">
                  GitHub username is the same as username
                </label>
              </div>
              {!useSameGithub && (
                <label className="block text-sm font-medium">
                  GitHub Username
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className={`w-full mt-1 px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                      nightMode
                        ? "bg-[#0d1117] text-white border-gray-700 focus:ring-blue-500"
                        : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                </label>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sameLeetcode"
                  checked={useSameLeetcode}
                  onChange={() => setUseSameLeetcode(!useSameLeetcode)}
                  className="h-4 w-4"
                />
                <label htmlFor="sameLeetcode" className="text-sm cursor-pointer">
                  LeetCode username is the same as username
                </label>
              </div>
              {!useSameLeetcode && (
                <label className="block text-sm font-medium">
                  LeetCode Username
                  <input
                    type="text"
                    name="leetcode"
                    value={formData.leetcode}
                    onChange={handleChange}
                    className={`w-full mt-1 px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                      nightMode
                        ? "bg-[#0d1117] text-white border-gray-700 focus:ring-blue-500"
                        : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                </label>
              )}

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
