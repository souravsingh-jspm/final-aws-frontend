import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<LandingLayout />}>
          <Route path="/sign-in" element={<Login />} />
        </Route>

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/orders" element={<OrderList />} />
            <Route
              path="/customer-orders/:customer_id"
              element={<CustomerOrders />}
            />
            <Route index path="/admin-order" element={<Orders />} />
            <Route index path="/admin-order-items" element={<OrderItems />} />
            <Route index path="/admin-service" element={<Service />} />
            <Route index path="/admin-garment" element={<Garment />} />
            <Route index path="/admin-customer" element={<Customer />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
