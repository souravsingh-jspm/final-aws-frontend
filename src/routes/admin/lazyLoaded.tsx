import { lazy } from "react";

export const SignIn = lazy(() => import("@/pages/auth/SignIn"));

export const OrderItems = lazy(() => import("@/pages/OrderItems/OrderItems"));

export const Customer = lazy(() => import("@/pages/customers/Customer"));

export const Garment = lazy(() => import("@/pages/garments/Garment"));

export const Orders = lazy(() => import("@/pages/orders/Orders"));

export const Service = lazy(() => import("@/pages/services/Service"));
