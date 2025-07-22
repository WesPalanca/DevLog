import { useEffect, useState } from "react";

const GithubStats = ({ username, nightMode }) => {
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  const githubHeaders = {
    Authorization: `token ${GITHUB_TOKEN}`,
  };

  const timeRanges = [
    { label: "Last year", days: 365 },
    { label: "Last half year", days: 182 },
    { label: "Last month", days: 30 },
    { label: "Last week", days: 7 },
    { label: "Last day", days: 1 },
  ];

  const [selectedRange, setSelectedRange] = useState(timeRanges[2]); // Default: Last month
  const [languageStats, setLanguageStats] = useState({});
  const [commitStats, setCommitStats] = useState(0);
  const [repoCommits, setRepoCommits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username || username === "[John Doe]") return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch repos
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          { headers: githubHeaders }
        );
        const repos = await reposRes.json();

        // Calculate since date based on selectedRange
        const since = new Date();
        since.setDate(since.getDate() - selectedRange.days);

        // Languages aggregation
        const langStats = {};
        // Commits aggregation
        let totalCommits = 0;
        const commitsPerRepo = [];

        for (const repo of repos) {
          // Get languages
          try {
            const langRes = await fetch(repo.languages_url, { headers: githubHeaders });
            const langData = await langRes.json();
            for (const [lang, bytes] of Object.entries(langData)) {
              langStats[lang] = (langStats[lang] || 0) + bytes;
            }
          } catch {
            // Ignore language fetch errors
          }

          // Get commits since 'since'
          try {
            const commitsRes = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/commits?since=${since.toISOString()}`,
              { headers: githubHeaders }
            );
            const commitsData = await commitsRes.json();
            const commitCount = Array.isArray(commitsData) ? commitsData.length : 0;

            totalCommits += commitCount;
            commitsPerRepo.push({ name: repo.name, commits: commitCount });
          } catch {
            commitsPerRepo.push({ name: repo.name, commits: 0 });
          }
        }

        setLanguageStats(langStats);
        setCommitStats(totalCommits);
        setRepoCommits(commitsPerRepo);
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [username, selectedRange]);

  return (
    <div
      className={`mt-6 p-6 rounded-lg shadow-md ${
        nightMode
          ? "bg-[#161b22] text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <h3 className="text-xl font-semibold mb-4">GitHub Stats for {username}</h3>

      {/* Time Range Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {timeRanges.map((range) => (
          <button
            key={range.label}
            onClick={() => setSelectedRange(range)}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              selectedRange.label === range.label
                ? nightMode
                  ? "bg-indigo-600 text-white"
                  : "bg-blue-600 text-white"
                : nightMode
                ? "bg-[#0d1117] text-gray-400 hover:bg-[#21262d]"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <strong>Total commits in {selectedRange.label.toLowerCase()}:</strong> {commitStats}
          </div>

          <div className="mb-4">
            <strong>Commits per repo:</strong>
            <ul className="list-disc list-inside max-h-48 overflow-y-auto rounded p-2">
              {repoCommits.map(({ name, commits }) => (
                <li key={name}>
                  <span className="font-medium">{name}</span>: {commits}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Language breakdown:</strong>
            <ul className="list-disc list-inside">
              {Object.entries(languageStats).map(([lang, bytes]) => (
                <li key={lang}>
                  {lang}: {bytes.toLocaleString()} bytes
                </li>
              ))}
              {Object.keys(languageStats).length === 0 && <li>No language data found.</li>}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default GithubStats;
