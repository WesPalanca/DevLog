import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ nightMode, setNightMode, sidebarOpen, setSidebarOpen }) => {
  const SIDEBAR_WIDTH = 256;
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <aside
        className={`
          flex flex-col justify-between py-6 px-4 shadow-lg
          transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}
          ${nightMode ? "bg-[#161b22] border-r border-gray-700" : "bg-white border-r border-gray-200"}
          relative z-20
        `}
        style={{ minWidth: sidebarOpen ? SIDEBAR_WIDTH : 0 }}
      >
        {sidebarOpen && (
          <>
            <div>
              <h1 className="text-2xl font-bold mb-10 select-none">DevLog</h1>
              <nav className="flex flex-col space-y-4 text-base font-medium">
                <Link to="/dashboard" className={`hover:underline ${nightMode ? "text-gray-200" : "text-gray-800"}`}>
                  🏠 Dashboard
                </Link>
                <Link to="/profile" className={`hover:underline ${nightMode ? "text-gray-200" : "text-gray-800"}`}>
                  👤 Profile
                </Link>
                <Link to="/logs" className={`hover:underline ${nightMode ? "text-gray-200" : "text-gray-800"}`}>
                  📜 Your Logs
                </Link>
                <Link to="/tasks" className={`hover:underline ${nightMode ? "text-gray-200" : "text-gray-800"}`}>
                  📝 Goals & Tasks
                </Link>
              </nav>
            </div>

            <div className="mt-10 space-y-4">
              <button
                onClick={() => setNightMode((prev) => !prev)}
                className={`w-full px-3 py-2 text-sm rounded-full transition font-medium ${
                  nightMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                {nightMode ? "☀ Light Mode" : "🌙 Dark Mode"}
              </button>

              <button
                onClick={handleSignOut}
                className={`w-full px-3 py-2 text-sm rounded-full transition font-medium ${
                  nightMode
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                🚪 Sign Out
              </button>
            </div>
          </>
        )}
      </aside>

      {/* Sidebar toggle button */}
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        className={`
          fixed top-6 p-2 rounded-md focus:outline-none transition
          ${nightMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}
          bg-transparent hover:bg-gray-300/20 dark:hover:bg-gray-700/40
          shadow-md z-30
        `}
        style={{
          left: sidebarOpen ? SIDEBAR_WIDTH + 0 : 0,
          width: 40,
          height: 40,
          transition: "left 0.3s ease",
        }}
      >
        {sidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </>
  );
};

export default Sidebar;
