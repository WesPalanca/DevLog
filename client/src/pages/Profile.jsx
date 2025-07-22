import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../components/ThemeContext";
import axios from 'axios';
import GithubStats from "../components/GithubStats";
const Profile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { nightMode, setNightMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
 


 

  const [profile, setProfile] = useState({
    username: "[John Doe]", 
    email: "johndoe@gmail.com",
    bio: "React dev",
  });

 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/details`, {
          headers: { Authorization: token }
        });

        const { userData } = response.data;
        setProfile(userData);

      } catch (error) {
        console.log("Failed to retrieve user data " + error)
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    localStorage.setItem("nightMode", nightMode);
  }, [nightMode]);



  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(`${apiUrl}/user/update`, profile, {
        headers: { Authorization: token }
      })
      const { message } = response.data;
      console.log(message);
      alert("Profile updated successfully!")
      setEditMode(false);
    } catch (error) {
      console.log("failed to update user data");
    }
  };

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${nightMode ? "bg-[#0d1117] text-white" : "bg-gray-50 text-gray-900"
        }`}
    >
      {/* Sidebar */}
      <Sidebar
        nightMode={nightMode}
        setNightMode={setNightMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content */}
      <main className="flex-1 p-6 relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          Your{" "}
          <span className={nightMode ? "text-indigo-400" : "text-blue-600"}>
            Profile
          </span>
        </h2>

        <div
          className={`p-6 rounded-lg shadow-md border ${nightMode
            ? "bg-[#161b22] border-gray-700"
            : "bg-white border border-gray-200"
            }`}
        >
          <div className="mb-4">
            <label className="block font-semibold mb-1">Username</label>
            {editMode ? (
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${nightMode
                  ? "bg-[#0d1117] text-white border-gray-600"
                  : "bg-white border-gray-300"
                  }`}
              />
            ) : (
              <p>{profile.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Email</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${nightMode
                  ? "bg-[#0d1117] text-white border-gray-600"
                  : "bg-white border-gray-300"
                  }`}
              />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-1">Bio</label>
            {editMode ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 rounded-md border ${nightMode
                  ? "bg-[#0d1117] text-white border-gray-600"
                  : "bg-white border-gray-300"
                  }`}
              />
            ) : (
              <p className="italic text-sm">
                {profile.bio || "No bio provided."}
              </p>
            )}
          </div>

          
          <button
            onClick={editMode ? handleSave : () => setEditMode(true)}
            className={`mt-6 px-4 py-2 rounded-md font-semibold transition-colors ${nightMode
              ? editMode
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
              : editMode
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
        <GithubStats nightMode={nightMode} username={profile.username}/>
      </main>
      
    </div>
  );
};

export default Profile;
