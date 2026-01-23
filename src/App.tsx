import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constant/appConstant";
import AppLayout from "@/layout/Layout";
import LandingLayout from "@/layout/landinglayout/LandingLayout";
import ProtectedRoute from "@/auth/ProtectedRoute";
import Login from "@/pages/auth/SignIn";
import Home from "@/pages/home/Home";
import OrderList from "./pages/orders/Orders";
import CustomerOrders from "./pages/orders/component/CustomerOrders";
import OrderItems from "./pages/OrderItems/OrderItems";
import Orders from "./pages/orders/Orders";
import Service from "./pages/services/Service";
import Garment from "./pages/garments/Garment";
import Customer from "./pages/customers/Customer";
import Dashboard from "./pages/dashboard/Dashboard";
import OrderView from "./pages/orders/component/OrderView"
import OrderHistory from "./pages/orders/component/OrderHistory";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path={ROUTES.SIGN_IN} element={<Login />} />
        <Route element={<LandingLayout />}>
          <Route index path={ROUTES.HOME} element={<Home />} />
        </Route>

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path="/orders">
              <Route path={ROUTES.ORDERS} element={<OrderList />} />
              <Route path="/orders/history/:customerId" element={<OrderHistory />} />
              <Route path="view/:id" element={<OrderView />} />
              <Route path="/orders/edit/:id" element={<OrderItems />} />
            </Route>
            <Route path={ROUTES.CUSTOMER_ORDERS} element={<CustomerOrders />} />
            <Route path={ROUTES.ADMIN_ORDERS} element={<Orders />} />
            <Route path={ROUTES.ADMIN_ORDER_ITEMS} element={<OrderItems />} />
            <Route path={ROUTES.ADMIN_SERVICES} element={<Service />} />
            <Route path={ROUTES.ADMIN_GARMENTS} element={<Garment />} />
            <Route path={ROUTES.ADMIN_CUSTOMERS} element={<Customer />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
