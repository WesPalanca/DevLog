import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/Auth" replace />;
  }

  try {
    const { exp } = jwtDecode(token);
    if (!exp || Date.now() >= exp * 1000) {
      // Token expired
      localStorage.removeItem("token");
      return <Navigate to="/Auth" replace />;
    }
  } catch (error) {
    // Invalid token format or decode error
    localStorage.removeItem("token");
    return <Navigate to="/Auth" replace />;
  }

  // Token valid
  return children;
};

export default ProtectedRoute;
