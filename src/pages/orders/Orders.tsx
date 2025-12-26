import "./Orders.css";
import React, { useEffect, useState, useRef, JSX } from "react";
import { BASE_URL } from "../../constant/appConstant";

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
  quantity?: number;
  customer_phone?: string;
  customer_name?: string;
  items?: OrderItem[] | null;
};

const ORDER_BASE = BASE_URL + "order/order";

function unwrapArray<T>(raw: any): T[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  if (raw && Array.isArray(raw.items)) return raw.items;
  return [];
}

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
          <button className="modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default function OrderList(): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [detailsOrder, setDetailsOrder] = useState<Order | null>(null);
  const [detailsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef<number | null>(null);
  useEffect(() => {
    fetchOrders();
  }, []);

  // debounce search input
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(
      () => setDebouncedSearch(search.trim()),
      400
    );
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [search]);

  useEffect(() => {
    fetchOrders(debouncedSearch);
  }, [debouncedSearch]);

  async function fetchOrders(searchTerm = "") {
    setLoading(true);
    setError(null);
    try {
      const url = searchTerm
        ? `https://api.shivaliwashingcompany.in/customer/customer-search?search=${encodeURIComponent(
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

    return d.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div className="orders">
      <header className="orders__header">
        <div>
          <h2 className="orders__title">Orders</h2>
          <div className="orders__subtitle">List of created orders</div>
        </div>

        <div className="orders__search">
          <input
            className="orders__search-input"
            placeholder="Search by customer ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="orders__btn orders__btn--primary"
            onClick={() => fetchOrders(debouncedSearch)}
          >
            Search
          </button>
          <button
            className="orders__btn orders__btn--secondary"
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
      ) : filteredOrders.length === 0 ? (
        <div className="orders__empty">No orders found.</div>
      ) : (
        <table className="orders__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Quantity</th>
              <th>Return expected</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
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
                  <td>{o.quantity}</td>
                  <td>{formatDate(earliest)}</td>
                  <td>{o.availability_status ?? o.customer_id}</td>
                  <td>{o.status ?? o.customer_id}</td>
                  <td>
                    <div className="orders__actions">
                      <button
                        className="orders__btn orders__btn--secondary"
                        onClick={() => {
                          window.location.href = `/customer-orders/${o.customer_id}`;
                        }}
                      >
                        View
                      </button>
                      <button
                        className="orders__btn orders__btn--danger"
                        onClick={() => handleDelete(o.order_id)}
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
            <div>
              <strong>Order:</strong> <span>{detailsOrder.order_id}</span>
            </div>

            <div>
              <strong>Customer:</strong>{" "}
              {detailsOrder.customer?.customer_name ?? detailsOrder.customer_id}
            </div>

            <div>
              <strong>Phone:</strong>{" "}
              {detailsOrder.customer?.customer_phone ?? "-"}
            </div>

            <div>
              <strong>Email:</strong>{" "}
              {detailsOrder.customer?.customer_email ?? "-"}
            </div>

            <div>
              <strong>Order return expected:</strong>{" "}
              {formatDate(
                detailsOrder.return_expected_by ??
                  earliestReturnExpected(detailsOrder.items ?? null)
              )}
            </div>

            <div>
              <strong>Created:</strong>{" "}
              {detailsOrder.createdAt
                ? new Date(detailsOrder.createdAt).toLocaleString()
                : "-"}
            </div>

            <hr />

            <h4>Items / Services</h4>
            {!detailsOrder.items || detailsOrder.items.length === 0 ? (
              <div>No items found for this order.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Garment</th>
                    <th>Service</th>
                    <th>Quantity</th>
                    <th>Availability</th>
                    <th>Return expected</th>
                    <th>Created</th>
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
          <div>No details available.</div>
        )}
      </Modal>
    </div>
  );
}
