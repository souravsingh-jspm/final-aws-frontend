import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Home";
import AppLayout from "./layout/Layout";
import Service from "./pages/services/Service";
import Garment from "./pages/garments/Garment";
import Customer from "./pages/customers/Customer";
import Orders from "./pages/orders/Orders";
import OrderItems from "./pages/OrderItems/OrderItems";
import OrderList from "./pages/orders/Orders";
import CustomerOrders from "./pages/orders/CustomerOrders";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
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
            <Route
              index
              path="/admin-garment"
              element={
                <Garment services={[]} onEdit={() => {}} onDelete={() => {}} />
              }
            />
            <Route
              index
              path="/admin-customer"
              element={
                <Customer services={[]} onEdit={() => {}} onDelete={() => {}} />
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
