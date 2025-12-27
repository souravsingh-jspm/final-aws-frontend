import { BASE_URL } from "@/constant/appConstant";
import "./CustomerOrders.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

/* ---------- Types ---------- */
type OrderStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DELIVERED"
  | "CANCELLED";

type Order = {
  order_id: string;
  customer_id: string;
  customer_name?: string;
  customer_phone?: string;
  return_expected_by?: string;
  availability_status?: string;
  status?: OrderStatus;
  order_created?: string;
};

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "DELIVERED",
  "CANCELLED",
];

export default function CustomerOrders() {
  const { customer_id } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track which order is currently being saved to show a local spinner
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomerOrders();
  }, [customer_id]);

  async function fetchCustomerOrders() {
    if (!customer_id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}order/order/customer/${customer_id}`);
      const json = await res.json();
      setOrders(Array.isArray(json) ? json : json.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch customer orders");
    } finally {
      setLoading(false);
    }
  }

  /* ---------- Inline Update Logic ---------- */
  async function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`${BASE_URL}order-item/order-item`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          status: newStatus,
        }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      // Update local state immediately so UI feels snappy
      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err: any) {
      alert(err.message || "Error updating status");
    } finally {
      setUpdatingId(null);
    }
  }

  function formatDate(date?: string) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
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

      {!loading && orders.length > 0 && (
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
                <td>
                  {/* --- INLINE DROPDOWN --- */}
                  <select
                    className="status-select"
                    value={o.status}
                    disabled={updatingId === o.order_id}
                    onChange={(e) =>
                      handleStatusChange(
                        o.order_id,
                        e.target.value as OrderStatus
                      )
                    }
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {updatingId === o.order_id && (
                    <span className="mini-loader">...</span>
                  )}
                </td>
                <td>{formatDate(o.order_created)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
