const GoalCard = ({goal, nightMode, onProgressChange, onMarkComplete, onDelete}) => {
  return (
    <div
      className={`p-4 rounded border ${
        goal.completed ? "border-green-500" : "border-gray-300"
      } ${nightMode ? "bg-[#161b22]" : "bg-white"}`}
    >
      <h3 className="text-lg font-semibold">{goal.title}</h3>
      <p className="text-sm text-gray-400">
        {new Date(goal.startDate).toLocaleDateString()} →{" "}
        {new Date(goal.endDate).toLocaleDateString()}
      </p>
      {goal.description && (
        <p className="mt-2 text-sm">{goal.description}</p>
      )}
      <div className="mt-4">
        <label className="text-sm font-medium">
          Progress: {goal.progress || 0}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={goal.progress || 0}
          onChange={(e) =>
            onProgressChange(goal._id, Number(e.target.value))
          }
          className="w-full"
        />
      </div>
      <div className="mt-2 flex items-center gap-2">
        {goal.completed ? (
          <span className="text-green-500 font-semibold">✅ Completed</span>
        ) : (
          <button
            onClick={() => onMarkComplete(goal._id)}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Mark as Complete
          </button>
        )}
        <button
          onClick={() => onDelete(goal._id)}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
