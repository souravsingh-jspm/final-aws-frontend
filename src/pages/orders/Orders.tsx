import React, { useEffect, useState, useRef, JSX } from "react";
import { BASE_URL } from "../../constant/appConstant";
import CustomButton from "@/components/buttons/CustomButton";

type OrderItem = {
  id: string;
};

type Order = {
  order_id: string;
  customer_id: string;
  customer_name?: string;
  customer_phone?: string;
  quantity?: number | string;
  status?: string;
  availability_status?: string;
  return_expected_by?: string;
  items?: OrderItem[] | null;
};

const ORDER_BASE = BASE_URL + "order/order";

/* =======================
   Helpers (unchanged)
======================= */
function unwrapArray<T>(raw: any): T[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (raw?.data && Array.isArray(raw.data)) return raw.data;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md mx-4 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

/* =======================
   Orders Page
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
        ? `https://api.shivaliwashingcompany.in/customer/customer-search?search=${encodeURIComponent(
            searchTerm
          )}`
        : ORDER_BASE;

      const res = await fetch(url);
      const raw = await res.json().catch(() => null);
      const list = unwrapArray<any>(raw);

      setOrders(isSearch ? mapCustomersToOrders(list) : (list as Order[]));
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
    return Number.isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
          <p className="text-sm text-gray-500">List of created orders</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            placeholder="Search by customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 px-4 rounded-lg border border-gray-300
                       focus:ring-2 focus:ring-blue-500"
          />
          <CustomButton onClick={() => fetchOrders(debouncedSearch)}>
            Search
          </CustomButton>
          <CustomButton
            variant="primary"
            onClick={() => {
              setSearch("");
              setDebouncedSearch("");
              fetchOrders();
            }}
          >
            Clear
          </CustomButton>
        </div>
      </header>

      {error && (
        <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-lg p-3">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-10 text-center text-sm text-gray-500">
          Loading orders…
        </div>
      ) : orders.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500 border border-dashed rounded-lg">
          No orders found.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden border border-gray-200 rounded-xl">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Name",
                    "Phone",
                    "Quantity",
                    "Return Expected",
                    "Priority",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.order_id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm">
                      {o.customer_name ?? o.customer_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {o.customer_phone ?? "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">{o.quantity ?? "-"}</td>
                    <td className="px-6 py-4 text-sm">
                      {formatDate(o.return_expected_by)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {o.availability_status ?? "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {o.status ?? "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <CustomButton
                          onClick={() =>
                            (window.location.href = `/customer-orders/${o.customer_id}`)
                          }
                        >
                          View
                        </CustomButton>
                        <CustomButton
                          variant="danger"
                          onClick={() => handleDelete(o.order_id)}
                        >
                          Delete
                        </CustomButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {orders.map((o) => (
              <div
                key={o.order_id}
                className="border border-gray-200 rounded-lg p-4 space-y-2 bg-white"
              >
                <div className="text-sm font-semibold">
                  {o.customer_name ?? o.customer_id}
                </div>
                <div className="text-xs text-gray-500">
                  {o.customer_phone ?? "-"}
                </div>
                <div className="text-xs text-gray-500">
                  Return: {formatDate(o.return_expected_by)}
                </div>

                <div className="flex gap-2 pt-2">
                  <CustomButton
                    className="flex-1"
                    onClick={() =>
                      (window.location.href = `/customer-orders/${o.customer_id}`)
                    }
                  >
                    View
                  </CustomButton>
                  <CustomButton
                    variant="danger"
                    className="flex-1"
                    onClick={() => handleDelete(o.order_id)}
                  >
                    Delete
                  </CustomButton>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      <Modal
        visible={!!detailsOrder}
        title="Order Details"
        onClose={() => setDetailsOrder(null)}
      >
        {detailsOrder && (
          <div className="text-sm">
            <strong>Order ID:</strong> {detailsOrder.order_id}
          </div>
        )}
      </Modal>
    </div>
  );
}
