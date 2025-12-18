import "./CustomerOrders.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Order = {
  order_id: string;
  customer_id: string;
  customer_name?: string;
  customer_phone?: string;
  return_expected_by?: string;
  availability_status?: string;
  status?: string;
  order_created?: string;
};

export default function CustomerOrders() {
  const { customer_id } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomerOrders();
  }, [customer_id]);

  async function fetchCustomerOrders() {
    if (!customer_id) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.shivaliwashingcompany.in/order/order/customer/${customer_id}`
      );
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : data.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch customer orders");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date?: string) {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  }

  return (
    <div className="customer-orders">
      <h2 className="customer-orders__title">Customer Orders</h2>
      <p className="customer-orders__subtitle">
        Showing all orders for <strong>{customer_id}</strong>
      </p>

      <button
        className="customer-orders__back-btn"
        onClick={() => (window.location.href = "/orders")}
      >
        Back to Orders
      </button>

      {loading && <div className="customer-orders__loading">Loading...</div>}
      {error && <div className="customer-orders__error">{error}</div>}
      {!loading && orders.length === 0 && (
        <div className="customer-orders__empty">
          No orders found for this customer.
        </div>
      )}

      {orders.length > 0 && (
        <table className="customer-orders__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Return Expected</th>
              <th>Availability</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.order_id}>
                <td>{o.customer_name}</td>
                <td>{formatDate(o.return_expected_by)}</td>
                <td>{o.availability_status}</td>
                <td>{o.status}</td>
                <td>{formatDate(o.order_created)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
