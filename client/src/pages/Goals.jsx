import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../components/ThemeContext";
import { useNavigate } from "react-router-dom";
import GoalCard from "../components/GoalCard";

const Goals = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const { nightMode, setNightMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/goals/fetch`, {
        headers: { Authorization: token },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.goals || [];
      setGoals(data);
    } catch (err) {
      console.error("Failed to fetch goals", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

 const handleCreateGoal = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${apiUrl}/goals/create`, newGoal, {
      headers: { Authorization: token },
    });
    if (res.data.success && res.data.goal) {
      const createdGoal = res.data.goal;

      // Make sure startDate and endDate are ISO strings
      createdGoal.startDate = new Date(createdGoal.startDate).toISOString();
      createdGoal.endDate = new Date(createdGoal.endDate).toISOString();

      setGoals([createdGoal, ...goals]);
      setNewGoal({ title: "", description: "", startDate: "", endDate: "" });
    } else {
      console.error("Goal creation response did not include new goal");
    }
  } catch (err) {
    console.error("Failed to create goal", err);
  }
};


  const handleProgressChange = async (goalId, progress) => {
    try {
      const res = await axios.put(
        `${apiUrl}/goals/update/${goalId}`,
        { progress },
        { headers: { Authorization: token } }
      );
      setGoals((prev) =>
        prev.map((goal) => (goal._id === goalId ? res.data : goal))
      );
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  const handleMarkComplete = async (goalId) => {
    try {
      const res = await axios.put(
        `${apiUrl}/goals/update/${goalId}`,
        { completed: true, progress: 100 },
        { headers: { Authorization: token } }
      );
      setGoals((prev) =>
        prev.map((goal) => (goal._id === goalId ? res.data : goal))
      );
    } catch (err) {
      console.error("Failed to mark goal as complete", err);
    }
  };

  const handleDeleteGoal = async (goalId) => {
  if (!window.confirm("Are you sure you want to delete this goal?")) return;

  try {
    const res = await axios.delete(`${apiUrl}/goals/delete/${goalId}`, {
      headers: { Authorization: token },
    });
    if (res.status === 200) {
      // Remove the deleted goal from the state list
      setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== goalId));
    }
  } catch (error) {
    console.error("Failed to delete goal", error);
    alert("Failed to delete goal. Please try again.");
  }
};


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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">🎯 Your Goals</h1>
        </div>

        {/* Create Goal Form */}
        <form
          onSubmit={handleCreateGoal}
          className={`grid gap-4 p-4 mb-8 rounded-md shadow ${
            nightMode ? "bg-[#161b22]" : "bg-white"
          }`}
        >
          <input
            type="text"
            placeholder="Goal Title"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            required
            className="p-2 rounded border"
          />
          <textarea
            placeholder="Description (optional)"
            value={newGoal.description}
            onChange={(e) =>
              setNewGoal({ ...newGoal, description: e.target.value })
            }
            className="p-2 rounded border"
          />
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label>Start Date</label>
              <input
                type="date"
                value={newGoal.startDate}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, startDate: e.target.value })
                }
                className="p-2 rounded border"
                required
              />
            </div>
            <div className="flex flex-col">
              <label>End Date</label>
              <input
                type="date"
                value={newGoal.endDate}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, endDate: e.target.value })
                }
                className="p-2 rounded border"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-fit px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ➕ Add Goal
          </button>
        </form>

        {/* Display Goals */}
        {loading ? (
          <p className="text-sm text-gray-400">Loading goals...</p>
        ) : goals.length === 0 ? (
          <p className="text-sm text-gray-400">You haven't set any goals yet.</p>
        ) : (
          <div className="space-y-6">
            {goals.map((goal) => (
              <GoalCard
                key={goal._id}
                goal={goal}
                nightMode={nightMode}
                onProgressChange={handleProgressChange}
                onMarkComplete={handleMarkComplete}
                onDelete={handleDeleteGoal}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Goals;
