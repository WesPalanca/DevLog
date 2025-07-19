import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar"; // Adjust path if needed



const Dashboard = () => {
  const [nightMode, setNightMode] = useState(() => {
    const saved = localStorage.getItem("nightMode");
    return saved === "true";
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("nightMode", nightMode);
  }, [nightMode]);

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        nightMode ? "bg-[#0d1117] text-white" : "bg-gray-50 text-gray-900"
      }`}
      style={{ position: "relative" }}
    >
      {/* Sidebar with toggle inside */}
      <Sidebar
        nightMode={nightMode}
        setNightMode={setNightMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 relative z-10">
        <h2 className="text-3xl font-bold mb-6">
          Welcome back,{" "}
          <span className={nightMode ? "text-indigo-400" : "text-blue-600"}>
            Developer
          </span>
        </h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <div
            className={`p-5 rounded-lg shadow-md ${
              nightMode
                ? "bg-[#161b22] border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">🧠 Goals</h3>
            <p className="text-sm">Complete 50 LeetCode problems (42%)</p>
          </div>

          <div
            className={`p-5 rounded-lg shadow-md ${
              nightMode
                ? "bg-[#161b22] border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">⏱ Time This Week</h3>
            <p className="text-sm">16.5 hours</p>
          </div>

          <div
            className={`p-5 rounded-lg shadow-md ${
              nightMode
                ? "bg-[#161b22] border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">🔧 Most Used Tech</h3>
            <p className="text-sm">React</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <section
          className={`mt-8 p-6 rounded-lg shadow-md ${
            nightMode
              ? "bg-[#161b22] border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">📈 Progress Chart</h3>
          <div className="h-64 flex items-center justify-center border border-dashed rounded text-sm text-gray-400">
            [Chart goes here]
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
