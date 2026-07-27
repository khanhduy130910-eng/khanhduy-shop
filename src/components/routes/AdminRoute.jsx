import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AdminRoute({
  children,
}) {
  const {
    initialized,
    loading,
    isLoggedIn,
    isAdmin,
  } = useAuth();

  if (!initialized || loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Đang tải...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}