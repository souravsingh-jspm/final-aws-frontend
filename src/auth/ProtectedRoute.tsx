import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/constant/appConstant";

const ProtectedRoute = () => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
