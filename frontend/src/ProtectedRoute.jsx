import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // ⏳ Wait until Firebase finishes checking auth
  if (loading) {
    return null; // or loader
  }

  // 🔐 Not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow page
  return children;
}

export default ProtectedRoute;
