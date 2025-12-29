import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constant/appConstant";

const Home = () => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
  }

  return <div>Landing Page</div>;
};

export default Home;
