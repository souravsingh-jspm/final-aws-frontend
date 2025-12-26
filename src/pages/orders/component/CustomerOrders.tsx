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

/* ---------- Component ---------- */
export default function CustomerOrders() {
  const { customer_id } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<OrderStatus>("PENDING");
  const [saving, setSaving] = useState(false);

  /* ---------- Fetch orders ---------- */
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

  /* ---------- Edit helpers ---------- */
  function openEdit(order: Order) {
    setEditingOrder(order);
    setStatus(order.status ?? "PENDING");
  }

  async function updateStatus() {
    if (!editingOrder) return;

    setSaving(true);
    try {
      const res = await fetch(`${BASE_URL}order-item/order-item`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: editingOrder.order_id,
          status,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update order status");
      }

      await fetchCustomerOrders();
      setEditingOrder(null);
    } catch (err: any) {
      setError(err.message || "Failed to update order status");
    } finally {
      setSaving(false);
    }
  }

  /* ---------- Utils ---------- */
  function formatDate(date?: string) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  }

  /* ---------- UI ---------- */
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
              <th>Actions</th>
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
                <td>
                  <button onClick={() => openEdit(o)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- Edit Modal ---------- */}
      {editingOrder && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Order Status</h3>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              disabled={saving}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <div className="modal-actions">
              <button onClick={() => setEditingOrder(null)} disabled={saving}>
                Cancel
              </button>
              <button onClick={updateStatus} disabled={saving}>
                {saving ? "Saving..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
