import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const GithubChart = ({ username, nightMode }) => {
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
  };

  const [commitData, setCommitData] = useState([]);
  const [languageData, setLanguageData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username || username === "[John Doe]") return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          { headers }
        );
        const repos = await reposRes.json();

        const since = new Date();
        since.setFullYear(since.getFullYear() - 1);

        const langBytes = {};
        const commitsByRepo = [];

        for (const repo of repos) {
          try {
            const langRes = await fetch(repo.languages_url, { headers });
            const langJson = await langRes.json();

            for (const [lang, bytes] of Object.entries(langJson)) {
              langBytes[lang] = (langBytes[lang] || 0) + bytes;
            }
          } catch {}

          try {
            const commitsRes = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/commits?since=${since.toISOString()}`,
              { headers }
            );
            const commitsJson = await commitsRes.json();
            commitsByRepo.push({
              name: repo.name,
              count: Array.isArray(commitsJson) ? commitsJson.length : 0,
            });
          } catch {
            commitsByRepo.push({ name: repo.name, count: 0 });
          }
        }

        setCommitData(commitsByRepo);
        setLanguageData(langBytes);
      } catch (err) {
        console.error("GitHub fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  const barChartData = {
    labels: commitData.map((r) => r.name),
    datasets: [
      {
        label: "Commits (Past Year)",
        data: commitData.map((r) => r.count),
        backgroundColor: nightMode ? "#4f46e5" : "#3b82f6",
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(languageData),
    datasets: [
      {
        label: "Languages (Bytes)",
        data: Object.values(languageData),
        backgroundColor: [
          "#f87171",
          "#60a5fa",
          "#34d399",
          "#fbbf24",
          "#a78bfa",
          "#fb7185",
          "#38bdf8",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`w-full h-full flex flex-col ${nightMode ? "text-white" : "text-gray-900"}`}>
      <h3 className="text-xl font-semibold mb-1 flex-shrink-0">GitHub Visual Stats</h3>

      {loading ? (
        <p className="flex-grow flex items-center justify-center">Loading charts...</p>
      ) : (
        <div className="flex flex-row gap-4 flex-grow">
          {/* Bar Chart */}
          <div className="w-1/2 flex flex-col">
            <h4 className="text-lg font-medium mb-1 flex-shrink-0">Commits per Repository</h4>
            <div className="flex-grow" style={{ minHeight: 0 }}>
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  animation: false,
                }}
              />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="w-1/2 flex flex-col">
            <h4 className="text-lg font-medium mb-1 flex-shrink-0">Language Usage</h4>
            {Object.keys(languageData).length ? (
              <div className="flex-grow" style={{ minHeight: 0 }}>
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false,
                  }}
                />
              </div>
            ) : (
              <p>No language data found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubChart;
