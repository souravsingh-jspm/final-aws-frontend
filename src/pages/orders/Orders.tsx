// src/components/OrderList.tsx
import React, { useEffect, useState, useRef, JSX } from "react";

/** Types — extend to match your backend. */
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
  // optional nested expansions
  service?: Service | null;
  garment?: Garment | null;
};

type Order = {
  order_id: string;
  customer_id: string;
  customer?: Customer | null;
  return_expected_by?: string; // order-level date (ISO)
  createdAt?: string;
  updatedAt?: string;
  items?: OrderItem[] | null;
};

const ORDER_BASE = "http://localhost:3001/order/order";

/* ---------- helpers to unwrap wrapped responses ---------- */
function unwrapArray<T>(raw: any): T[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  if (raw && Array.isArray(raw.items)) return raw.items;
  return [];
}
function unwrapSingle<T>(raw: any): T | null {
  if (!raw) return null;
  if (
    raw &&
    raw.data &&
    typeof raw.data === "object" &&
    !Array.isArray(raw.data)
  )
    return raw.data as T;
  if (raw && typeof raw === "object" && ("order_id" in raw || "id" in raw))
    return raw as T;
  return null;
}

/* ---------- Modal ---------- */
const Modal: React.FC<{
  visible: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ visible, title, onClose, children }) => {
  if (!visible) return null;
  return (
    <div style={styles.modalBackdrop} role="dialog" aria-modal="true">
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <strong>{title}</strong>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
            ×
          </button>
        </div>
        <div style={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

/* ---------- Main component ---------- */
export default function OrderList(): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [detailsOrder, setDetailsOrder] = useState<Order | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef<number | null>(null);
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // debounce search input
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    // use window.setTimeout to keep proper return type for clearTimeout
    debounceRef.current = window.setTimeout(
      () => setDebouncedSearch(search.trim()),
      400
    );
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [search]);

  // refetch when debounced search changes
  useEffect(() => {
    fetchOrders(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  async function fetchOrders(searchTerm = "") {
    setLoading(true);
    setError(null);
    try {
      const url = searchTerm
        ? `http://localhost:3001/customer/customer-search?search=${encodeURIComponent(
            searchTerm
          )}`
        : ORDER_BASE;
      const res = await fetch(url, { method: "GET" });
      const raw = await res.json().catch(() => null);
      console.debug("GET orders raw:", raw);

      const list = unwrapArray<Order>(raw);
      if (list && list.length >= 0) {
        setOrders(list);
        return;
      }

      // Fallback parsing
      if (raw && Array.isArray(raw)) {
        setOrders(raw);
      } else if (raw && raw.data && Array.isArray(raw.data)) {
        setOrders(raw.data);
      } else {
        setOrders([]);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchOrderDetails(order_id: string) {
    setDetailsLoading(true);
    try {
      const res = await fetch(`${ORDER_BASE}/${encodeURIComponent(order_id)}`, {
        method: "GET",
      });
      const raw = await res.json().catch(() => null);
      console.debug("GET order details raw:", raw);

      const ord =
        unwrapSingle<Order>(raw) || (raw && raw.data ? raw.data : null);
      if (ord) {
        setDetailsOrder(ord);
      } else if (raw && Array.isArray(raw) && raw.length > 0) {
        setDetailsOrder(raw[0]);
      } else {
        setDetailsOrder(null);
        setError("Order details not returned by server");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch order details");
      setDetailsOrder(null);
    } finally {
      setDetailsLoading(false);
    }
  }

  // open summary immediately then fetch details to populate modal
  function openDetails(order: Order) {
    setDetailsOrder(order); // show quick summary if available
    fetchOrderDetails(order.order_id);
  }

  function closeDetails() {
    setDetailsOrder(null);
  }

  async function handleDelete(order_id: string) {
    if (!confirm("Delete this order?")) return;
    try {
      const res = await fetch(`${ORDER_BASE}/${encodeURIComponent(order_id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const raw = await res.json().catch(() => null);
        throw new Error(raw?.message || `Delete failed: ${res.status}`);
      }
      setOrders((prev) => prev.filter((o) => o.order_id !== order_id));
      if (detailsOrder?.order_id === order_id) setDetailsOrder(null);
    } catch (err: any) {
      alert(err?.message || "Failed to delete");
    }
  }

  // client-side filter in addition to server-side search (fallback)
  const filteredOrders = React.useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    if (!q) return orders;
    return orders.filter((o) => {
      const name = (o.customer?.customer_name ?? "").toLowerCase();
      const phone = (o.customer?.customer_phone ?? "").toLowerCase();
      const email = (o.customer?.customer_email ?? "").toLowerCase();
      const id = (o.customer_id ?? "").toLowerCase();
      return (
        name.includes(q) ||
        phone.includes(q) ||
        email.includes(q) ||
        id.includes(q)
      );
    });
  }, [orders, debouncedSearch]);

  // prefer order-level return_expected_by, else earliest among items
  function earliestReturnExpected(
    items?: OrderItem[] | null,
    orderLevel?: string | undefined
  ): string | null {
    if (orderLevel) return orderLevel;
    if (!items || items.length === 0) return null;
    const dates = items
      .map((it) => it.return_expected_by)
      .filter(Boolean)
      .map((s) => new Date(s as string))
      .filter((d) => !Number.isNaN(d.getTime()));
    if (dates.length === 0) return null;
    const earliest = dates.reduce((a, b) =>
      a.getTime() <= b.getTime() ? a : b
    );
    return earliest.toISOString();
  }

  function formatDate(iso?: string | null | undefined) {
    if (!iso) return "-";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleString();
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h2>Orders</h2>
          <div style={styles.subtitle}>List of created orders</div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            placeholder="Search by customer ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button
            onClick={() => fetchOrders(debouncedSearch)}
            style={styles.primaryBtn}
          >
            Search
          </button>
          <button
            onClick={() => {
              setSearch("");
              setDebouncedSearch("");
              fetchOrders();
            }}
            style={styles.secondaryBtn}
          >
            Clear
          </button>
        </div>
      </header>

      {error && <div style={styles.error}>{error}</div>}

      {loading ? (
        <div>Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div style={styles.empty}>No orders found.</div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Phone</th>
              {/* <th style={{ textAlign: "left" }}>Email</th> */}
              <th style={{ textAlign: "left" }}>Quantity</th>
              <th style={{ textAlign: "left" }}>Return expected</th>
              <th style={{ textAlign: "left" }}>Priority</th>
              <th style={{ textAlign: "left" }}>Status</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o) => {
              const earliest = earliestReturnExpected(
                o.items ?? null,
                o.return_expected_by
              );
              return (
                <tr key={o.order_id}>
                  <td>{o.customer_name ?? o.customer_id}</td>
                  <td>{o.customer_phone ?? "-"}</td>
                  <td >{o.quantity}</td> 
                  <td>{formatDate(earliest)}</td>
                  {/* <td>{Array.isArray(o.items) ? o.items.length : "-"}</td> */}
                  {/* <td>
                    {o.createdAt ? new Date(o.createdAt).toLocaleString() : "-"}
                  </td> */}

                  <td>{o.availability_status ?? o.customer_id}</td>
                  <td>{o.status ?? o.customer_id}</td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => {
                          window.location.href = `/customer-orders/${o.customer_id}`;
                        }}
                        style={styles.secondaryBtn}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(o.order_id)}
                        style={styles.dangerBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <Modal
        visible={!!detailsOrder}
        title="Order details"
        onClose={closeDetails}
      >
        {detailsLoading ? (
          <div>Loading details...</div>
        ) : detailsOrder ? (
          <div>
            <div style={{ marginBottom: 8 }}>
              <strong>Order:</strong>{" "}
              <span style={{ fontFamily: "monospace" }}>
                {detailsOrder.order_id}
              </span>
            </div>

            <div style={{ marginBottom: 6 }}>
              <strong>Customer:</strong>{" "}
              {detailsOrder.customer?.customer_name ?? detailsOrder.customer_id}
            </div>

            <div style={{ marginBottom: 6 }}>
              <strong>Phone:</strong>{" "}
              {detailsOrder.customer?.customer_phone ?? "-"}
            </div>

            <div style={{ marginBottom: 6 }}>
              <strong>Email:</strong>{" "}
              {detailsOrder.customer?.customer_email ?? "-"}
            </div>

            <div style={{ marginBottom: 8 }}>
              <strong>Order return expected:</strong>{" "}
              {formatDate(
                detailsOrder.return_expected_by ??
                  earliestReturnExpected(detailsOrder.items ?? null)
              )}
            </div>

            <div style={{ marginBottom: 8 }}>
              <strong>Created:</strong>{" "}
              {detailsOrder.createdAt
                ? new Date(detailsOrder.createdAt).toLocaleString()
                : "-"}
            </div>

            <hr />

            <h4 style={{ marginTop: 12 }}>Items / Services</h4>
            {!detailsOrder.items || detailsOrder.items.length === 0 ? (
              <div style={{ color: "#666", padding: 8 }}>
                No items found for this order.
              </div>
            ) : (
              <table style={styles.innerTable}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Garment</th>
                    <th style={{ textAlign: "left" }}>Service</th>
                    <th style={{ textAlign: "left" }}>Quantity</th>
                    <th style={{ textAlign: "left" }}>Availability</th>
                    <th style={{ textAlign: "left" }}>Return expected</th>
                    <th style={{ textAlign: "left" }}>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {detailsOrder.items!.map((it) => (
                    <tr key={it.id}>
                      <td>
                        {it.garment?.garment_name ?? it.garment_id ?? "-"}
                      </td>
                      <td>
                        {it.service?.service_name ?? it.service_id ?? "-"}
                      </td>
                      <td>
                        {typeof it.quantity === "number" ? it.quantity : "-"}
                      </td>
                      <td>{it.availability_status ?? "-"}</td>
                      <td>
                        {it.return_expected_by
                          ? formatDate(it.return_expected_by)
                          : "-"}
                      </td>
                      <td>
                        {it.createdAt
                          ? new Date(it.createdAt).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div style={{ color: "#666" }}>No details available.</div>
        )}
      </Modal>
    </div>
  );
}

/* ---------- styles ---------- */
const styles: { [k: string]: React.CSSProperties } = {
  container: {
    maxWidth: 1000,
    margin: "18px auto",
    padding: 16,
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  subtitle: { color: "#555", fontSize: 13 },
  searchInput: {
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    minWidth: 280,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
  },
  innerTable: { width: "100%", borderCollapse: "collapse", marginTop: 8 },
  empty: { color: "#666", padding: 24 },
  primaryBtn: {
    background: "#0b74de",
    color: "#fff",
    border: 0,
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#f3f4f6",
    color: "#111",
    border: "1px solid #e5e7eb",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  dangerBtn: {
    background: "#ffecec",
    color: "#b91c1c",
    border: "1px solid #f1a1a1",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  error: { color: "#b91c1c", marginBottom: 8 },
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: 16,
  },
  modal: {
    width: 820,
    maxWidth: "100%",
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 12px 60px rgba(0,0,0,0.12)",
    overflow: "hidden",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "1px solid #eef2f6",
  },
  closeBtn: {
    background: "transparent",
    border: 0,
    fontSize: 20,
    cursor: "pointer",
    lineHeight: 1,
  },
  modalBody: { padding: 16 },
  errorText: { color: "#b91c1c" },
};
