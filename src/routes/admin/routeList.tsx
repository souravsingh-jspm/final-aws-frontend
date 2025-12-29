// src/routes/routeList.tsx
import { Customer, OrderItems, Orders, Service, Garment } from "./lazyLoaded";
import { ROUTES } from "@/constant/appConstant";
import Dashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/home/Home";
import { Navigate } from "react-router";

// const token = localStorage?.getItem("token") || null;
// const user = localStorage?.getItem("user")
//   ? JSON?.parse(localStorage?.getItem("user") ?? "")
//   : {};

export const isUser = true;

export const adminRoutes = [
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTES.ADMIN_ORDERS,
    element: <Orders />,
  },
  {
    path: ROUTES.ADMIN_ORDER_ITEMS,
    element: <OrderItems />,
  },
  {
    path: ROUTES.ADMIN_SERVICES,
    element: <Service />,
  },
  {
    path: ROUTES.ADMIN_GARMENTS,
    element: <Garment />,
  },
  {
    path: ROUTES.ADMIN_CUSTOMERS,
    element: <Customer />,
  },
];

export const publicRoutes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
];

export const homeNavigator = [
  {
    path: ROUTES.STAR,
    element: <Navigate to={ROUTES.HOME} replace />,
  },
];

export const routeNavigator = [
  {
    path: ROUTES.ADMIN_DASHBOARD,
    element: <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />,
  },
];

export const landingRoutes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
];
