import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import LogCard from "../components/LogCard"; // import LogCard
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
const UserLogs = () => {
  const apiUrl = import.meta.env.VITE_DEV_URL;
  const [logs, setLogs] = useState([]);
  const { nightMode, setNightMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const fetchUserLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/logs/fetch`, {
        headers: { Authorization: token },
      });
      const { success, message, userLogs } = response.data;
      if (success) {
        setLogs(userLogs);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log("Error fetching logs:", error.message);
    }
  };

  useEffect(() => {
    fetchUserLogs();
  }, []);

  const deleteLog = async (logId) => {
    if (!window.confirm("Are you sure you want to delete this log?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/logs/delete/${logId}`, {
        headers: { Authorization: token },
      });
      setLogs((prevLogs) => prevLogs.filter((log) => log._id !== logId));
    } catch (error) {
      console.error("Error deleting log:", error);
      alert("Failed to delete log. Please try again.");
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

      <main className="flex-1 p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">📜 Your Logs</h1>
          <button
            onClick={() => navigate("/logs/create")}
            className={`px-5 py-2 rounded-md text-sm font-semibold shadow transition-all ${
              nightMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            ➕ Create Log
          </button>
        </div>

        {logs.length === 0 ? (
          <p className="text-sm text-gray-400">You haven't logged anything yet.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <LogCard
                key={log._id}
                log={log}
                nightMode={nightMode}
                onDelete={deleteLog}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserLogs;
