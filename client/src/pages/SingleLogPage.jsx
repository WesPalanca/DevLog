import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../components/ThemeContext";

const SingleLogPage = () => {
  const { logId } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [log, setLog] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const { nightMode, setNightMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time_spent: "",
    tech: [],
  });

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${apiUrl}/logs/fetch/${logId}`, {
          headers: { Authorization: token },
        });
        setLog(res.data.log);
        setFormData({
          title: res.data.log.title || "",
          description: res.data.log.description || "",
          time_spent: res.data.log.time_spent || "",
          tech: res.data.log.tech || [],
        });
      } catch (error) {
        console.error("Error fetching log:", error.message);
      }
    };

    fetchLog();
  }, [logId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (e) => {
    const value = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tech: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${apiUrl}/logs/update/${logId}`, formData, {
        headers: { Authorization: token },
      });
      alert("Log updated successfully!");
    } catch (error) {
      console.error("Error saving log:", error.message);
      alert("Failed to update log.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!log) {
    return (
      <div
        className={`flex min-h-screen transition-colors duration-300 ${
          nightMode ? "bg-[#0d1117] text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Sidebar
          nightMode={nightMode}
          setNightMode={setNightMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 p-6 relative z-10">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        nightMode ? "bg-[#0d1117] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar
        nightMode={nightMode}
        setNightMode={setNightMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex-1 p-6 relative z-10">
        <h1 className="text-3xl font-bold mb-6">📝 View & Edit Log</h1>

        <div
          className={`p-6 rounded-lg shadow-md border ${
            nightMode
              ? "bg-[#161b22] border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <label className="block mb-4">
            <span className="block font-semibold mb-1">Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                nightMode
                  ? "bg-[#0d1117] border-gray-700 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
            />
          </label>

          <label className="block mb-4">
            <span className="block font-semibold mb-1">Description</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className={`w-full px-3 py-2 rounded-md border ${
                nightMode
                  ? "bg-[#0d1117] border-gray-700 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
            />
          </label>

          <label className="block mb-4">
            <span className="block font-semibold mb-1">Time Spent (hrs)</span>
            <input
              type="number"
              name="time_spent"
              value={formData.time_spent}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                nightMode
                  ? "bg-[#0d1117] border-gray-700 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
            />
          </label>

          <label className="block mb-6">
            <span className="block font-semibold mb-1">Tech Tags (comma-separated)</span>
            <input
              type="text"
              value={formData.tech.join(", ")}
              onChange={handleTechChange}
              className={`w-full px-3 py-2 rounded-md border ${
                nightMode
                  ? "bg-[#0d1117] border-gray-700 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
            />
          </label>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2 rounded-md font-semibold shadow transition-all ${
              nightMode
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isSaving ? "Saving..." : "💾 Save Changes"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default SingleLogPage;
