import { Navigate, Outlet } from "react-router-dom";
import { isAuthExpired, clearAuth } from "./authStorage";

const ProtectedRoute = () => {
  if (isAuthExpired()) {
    clearAuth();
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
