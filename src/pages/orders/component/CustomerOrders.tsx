import { BASE_URL } from "@/constant/appConstant";
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-800">
          Customer Orders
        </h2>
        <p className="text-sm text-gray-500">
          Showing all orders for{" "}
          <span className="font-medium">{customer_id}</span>
        </p>

        <button
          onClick={() => (window.location.href = "/orders")}
          className="inline-flex items-center text-sm text-blue-600 hover:underline"
        >
          ← Back to Orders
        </button>
      </header>

      {/* States */}
      {loading && (
        <div className="py-10 text-center text-sm text-gray-500">
          Loading orders…
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="py-10 text-center text-sm text-gray-500 border border-dashed rounded-lg">
          No orders found for this customer.
        </div>
      )}

      {/* Content */}
      {!loading && orders.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden border border-gray-200 rounded-xl">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Name",
                    "Return Expected",
                    "Availability",
                    "Status",
                    "Created",
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
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {o.customer_name ?? "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {formatDate(o.return_expected_by)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {o.availability_status ?? "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <select
                          value={o.status}
                          disabled={updatingId === o.order_id}
                          onChange={(e) =>
                            handleStatusChange(
                              o.order_id,
                              e.target.value as OrderStatus
                            )
                          }
                          className="h-9 px-3 rounded-md border border-gray-300
                                     text-sm focus:ring-2 focus:ring-blue-500
                                     disabled:bg-gray-100"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>

                        {updatingId === o.order_id && (
                          <span className="text-xs text-gray-400">
                            Saving…
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {formatDate(o.order_created)}
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
                className="border border-gray-200 rounded-lg p-4 space-y-3 bg-white"
              >
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    {o.customer_name ?? "-"}
                  </div>
                  <div className="text-xs text-gray-500">
                    Return: {formatDate(o.return_expected_by)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Availability: {o.availability_status ?? "-"}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={o.status}
                    disabled={updatingId === o.order_id}
                    onChange={(e) =>
                      handleStatusChange(
                        o.order_id,
                        e.target.value as OrderStatus
                      )
                    }
                    className="flex-1 h-10 px-3 rounded-md border border-gray-300
                               text-sm focus:ring-2 focus:ring-blue-500
                               disabled:bg-gray-100"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  {updatingId === o.order_id && (
                    <span className="text-xs text-gray-400">
                      Saving…
                    </span>
                  )}
                </div>

                <div className="text-xs text-gray-500">
                  Created: {formatDate(o.order_created)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
