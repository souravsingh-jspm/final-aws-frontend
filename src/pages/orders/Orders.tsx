import "./Orders.css";
import React, { useEffect, useState, useRef, JSX } from "react";
import { BASE_URL } from "../../constant/appConstant";

/* =======================
   Types
======================= */

type Customer = {
  customer_id: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
};

type Garment = {
  garment_id: string;
  garment_name?: string;
};

type Service = {
  service_id: string;
  service_name?: string;
};

type OrderItem = {
  id: string;
  service_id?: string;
  garment_id?: string;
  quantity?: number;
  availability_status?: string;
  return_expected_by?: string;
  createdAt?: string;
  updatedAt?: string;
  service?: Service | null;
  garment?: Garment | null;
};

type Order = {
  order_id: string;
  customer_id: string;
  customer?: Customer | null;
  return_expected_by?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  availability_status?: string;
  quantity?: number | string;
  customer_phone?: string;
  customer_name?: string;
  items?: OrderItem[] | null;
};

/* =======================
   Constants
======================= */

const ORDER_BASE = BASE_URL + "order/order";

/* =======================
   Helpers
======================= */

function unwrapArray<T>(raw: any): T[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (raw?.data && Array.isArray(raw.data)) return raw.data;
  if (raw?.items && Array.isArray(raw.items)) return raw.items;
  return [];
}

function mapCustomersToOrders(customers: any[]): Order[] {
  return customers.map((c) => ({
    order_id: `customer-${c.customer_id}`,
    customer_id: c.customer_id,
    customer_name: c.customer_name ?? "-",
    customer_phone: c.customer_phone ?? "-",
    quantity: "-",
    status: "-",
    availability_status: "-",
    return_expected_by: undefined,
    items: [],
  }));
}

/* =======================
   Modal
======================= */

const Modal: React.FC<{
  visible: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ visible, title, onClose, children }) => {
  if (!visible) return null;
  return (
    <div className="modal__overlay" role="dialog" aria-modal="true">
      <div className="modal__content">
        <div className="modal__header">
          <strong>{title}</strong>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

/* =======================
   Component
======================= */

export default function OrderList(): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [detailsOrder, setDetailsOrder] = useState<Order | null>(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(
      () => setDebouncedSearch(search.trim()),
      400
    );
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  useEffect(() => {
    fetchOrders(debouncedSearch);
  }, [debouncedSearch]);

  async function fetchOrders(searchTerm = "") {
    setLoading(true);
    setError(null);

    try {
      const isSearch = Boolean(searchTerm);
      const url = isSearch
        ? `http://localhost:3001/customer/customer-search?search=${encodeURIComponent(
            searchTerm
          )}`
        : ORDER_BASE;

      const res = await fetch(url);
      const raw = await res.json().catch(() => null);
      const list = unwrapArray<any>(raw);

      if (isSearch) {
        setOrders(mapCustomersToOrders(list));
      } else {
        setOrders(list as Order[]);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(order_id: string) {
    if (order_id.startsWith("customer-")) return;
    if (!confirm("Delete this order?")) return;

    try {
      await fetch(`${ORDER_BASE}/${order_id}`, { method: "DELETE" });
      setOrders((prev) => prev.filter((o) => o.order_id !== order_id));
    } catch {
      alert("Failed to delete order");
    }
  }

  function formatDate(iso?: string | null) {
    if (!iso) return "-";
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "-" : d.toLocaleDateString("en-US");
  }

  /* =======================
     Render
  ======================= */

  return (
    <div className="orders">
      <header className="orders__header">
        <div>
          <h2 className="orders__title">Orders</h2>
          <div className="orders__subtitle">List of created orders</div>
        </div>

        <div className="orders__search">
          <input
            className="order_search_input"
            placeholder="Search by customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => fetchOrders(debouncedSearch)}>Search</button>
          <button
            onClick={() => {
              setSearch("");
              setDebouncedSearch("");
              fetchOrders();
            }}
          >
            Clear
          </button>
        </div>
      </header>

      {error && <div className="orders__error">{error}</div>}
      {loading ? (
        <div>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="orders__empty">No orders found.</div>
      ) : (
        <table className="orders__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Quantity</th>
              <th>Return Expected</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.order_id}>
                <td>{o.customer_name ?? o.customer_id}</td>
                <td>{o.customer_phone ?? "-"}</td>
                <td>{o.quantity ?? "-"}</td>
                <td>{formatDate(o.return_expected_by)}</td>
                <td>{o.availability_status ?? "-"}</td>
                <td>{o.status ?? "-"}</td>
                <td>
                  <button
                    onClick={() =>
                      (window.location.href = `/customer-orders/${o.customer_id}`)
                    }
                  >
                    View
                  </button>
                  <button
                    disabled={o.order_id.startsWith("customer-")}
                    onClick={() => handleDelete(o.order_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        visible={!!detailsOrder}
        title="Order Details"
        onClose={() => setDetailsOrder(null)}
      >
        {detailsOrder ? (
          <div>
            <strong>Order ID:</strong> {detailsOrder.order_id}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
