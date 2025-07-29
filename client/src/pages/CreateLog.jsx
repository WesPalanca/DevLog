import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../components/ThemeContext";

const CreateLog = () => {
  const apiUrl = import.meta.env.VITE_DEV_URL;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hoursSpent, setHoursSpent] = useState("");
  const [tags, setTags] = useState([]); // now an array
  const [tagInput, setTagInput] = useState(""); // input for typing new tag
  const { nightMode, setNightMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Add a new tag
  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  // Remove a tag by value
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle Enter key on tag input
  const onTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/logs/add`,
        {
          title,
          description: content,
          time_spent: Number(hoursSpent),
          tech: tags,
        },
        {
          headers: { Authorization: token },
        }
      );

      if (response.data.success) {
        navigate("/logs");
      } else {
        alert("Failed to create log: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating log:", error);
      alert("An error occurred while creating the log.");
    }
  };

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        nightMode ? "bg-[#0d1117] text-white" : "bg-gray-50 text-gray-900"
      }`}
      style={{ position: "relative" }}
    >
      <Sidebar
        nightMode={nightMode}
        setNightMode={setNightMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex-1 p-6 relative z-10 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">➕ Create a New Log</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 rounded border ${
                nightMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>

          <div>
            <label htmlFor="content" className="block font-semibold mb-1">
              Content
            </label>
            <textarea
              id="content"
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full p-2 rounded border resize-none ${
                nightMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>

          <div>
            <label htmlFor="hoursSpent" className="block font-semibold mb-1">
              Hours Spent
            </label>
            <input
              type="number"
              id="hoursSpent"
              required
              min="0"
              step="0.1"
              value={hoursSpent}
              onChange={(e) => setHoursSpent(e.target.value)}
              className={`w-full p-2 rounded border ${
                nightMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
              placeholder="e.g. 1.5"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Tech Used</label>
            <div
              className={`flex flex-wrap gap-2 p-2 rounded border ${
                nightMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    aria-label={`Remove tag ${tag}`}
                    className="font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={onTagKeyDown}
                placeholder="Type and press Enter"
                className={`flex-grow bg-transparent focus:outline-none ${
                  nightMode ? "text-white" : "text-black"
                }`}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className={`px-6 py-2 rounded-md font-semibold shadow transition-all ${
                nightMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Save Log
            </button>
            <button
              type="button"
              onClick={() => navigate("/logs")}
              className={`px-6 py-2 rounded-md font-semibold shadow transition-all ${
                nightMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-300 text-gray-900 hover:bg-gray-400"
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateLog;
