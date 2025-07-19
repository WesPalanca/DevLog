import { useNavigate } from "react-router-dom";

const LogCard = ({ log, nightMode, onDelete }) => {
  const navigate = useNavigate();

  const createdDate = new Date(log.createdAt).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const updatedDate = new Date(log.updatedAt).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleTitleClick = (e) => {
    e.stopPropagation();
    navigate(`/logs/${log._id}`);
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-sm border transition ${
        nightMode ? "bg-[#161b22] border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start">
        <h2
          onClick={handleTitleClick}
          className="text-xl font-semibold mb-1 text-blue-600 hover:underline cursor-pointer"
        >
          {log.title}
        </h2>

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(log._id);
            }}
            className={`text-sm font-semibold px-3 py-1 rounded-md transition-colors ${
              nightMode
                ? "bg-red-700 text-white hover:bg-red-800"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            aria-label="Delete log"
          >
            Delete
          </button>
        )}
      </div>

      <p className="text-sm text-gray-400 mb-1">
        Created: {createdDate}
      </p>
      <p className="text-sm text-gray-400 mb-2">
        Updated: {updatedDate}
      </p>

      <p className="text-sm text-gray-600 mb-2 italic">
        Worked on for {log.time_spent || 0} {log.time_spent === 1 ? "hr" : "hrs"}
      </p>

      <p className="text-sm mb-2">{log.description}</p>

      {log.tech?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {log.tech.map((tag, i) => (
            <span
              key={i}
              className={`px-2 py-1 text-xs rounded-full ${
                nightMode ? "bg-blue-800 text-blue-200" : "bg-blue-100 text-blue-700"
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LogCard;
