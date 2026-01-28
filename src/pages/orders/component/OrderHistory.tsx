import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "@/constant/appConstant";
import CustomButton from "@/components/buttons/CustomButton";

type OrderHistoryRow = {
  customer_seq: number;
  customer_name: string;
  order_id: string;
  return_expected_by: string;
  created_at: string;
  status: string;
  quantity: number;
};

const ORDER_HISTORY_BY_CUSTOMER =
  BASE_URL + "order/order/customer";

const ORDER_DELETE = BASE_URL + "order/order";

const ORDER_STATUS_OPTIONS = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;

type OrderStatus = typeof ORDER_STATUS_OPTIONS[number];


export default function OrderHistory() {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<OrderHistoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId) {
      setError("Invalid customer id");
      setLoading(false);
      return;
    }

    fetch(`${ORDER_HISTORY_BY_CUSTOMER}/${customerId}`)
      .then((r) => r.json())
      .then((res) => setOrders(res.data ?? res))
      .catch(() => setError("Failed to load order history"))
      .finally(() => setLoading(false));
  }, [customerId]);

  async function deleteOrder(orderId: string) {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      await fetch(`${ORDER_DELETE}/${orderId}`, {
        method: "DELETE",
      });

      setOrders((prev) =>
        prev.filter((o) => o.order_id !== orderId)
      );
    } catch {
      alert("Failed to delete order");
    }
  }
async function updateStatus(orderId: string, newStatus: OrderStatus) {
  try {
    // Optimistic UI update
    setOrders((prev) =>
      prev.map((o) =>
        o.order_id === orderId ? { ...o, status: newStatus } : o
      )
    );

    await fetch(`${ORDER_DELETE}/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
  } catch {
    alert("Failed to update order status");
  }
}

  if (loading) return <div className="p-6">Loading order history…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Order History</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1.5 border rounded-md bg-white hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-sm">Customer</th>
              <th className="px-3 py-2 text-left text-sm">Status</th>
              <th className="px-3 py-2 text-left text-sm">Quantity</th>
              <th className="px-3 py-2 text-left text-sm">Created Date</th>
              <th className="px-3 py-2 text-left text-sm">Return Date</th>
              <th className="px-3 py-2 text-center text-sm">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td className="px-3 py-2">
                  {order.customer_name}
                </td>
                <td className="px-3 py-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.order_id,
                        e.target.value as OrderStatus
                      )
                    }
                    className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring"
                  >
                    {ORDER_STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-3 py-2">
                  {order.quantity}
                </td>
                <td className="px-3 py-2">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </td>
                <td className="px-3 py-2">
                  {new Date(
                    order.return_expected_by
                  ).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 text-right space-x-2">
                    <Link to={`/orders/view/${order.order_id}`}>
                        <CustomButton variant="success">
                        View
                        </CustomButton>
                    </Link>

                    <Link to={`/orders/edit/${order.order_id}`}>
                        <CustomButton variant="primary">
                        Edit
                        </CustomButton>
                    </Link>

                    <CustomButton
                        variant="danger"
                        onClick={() => deleteOrder(order.order_id)}
                    >
                        Delete
                    </CustomButton>
                </td>

              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-3 py-6 text-center text-gray-500"
                >
                  No orders found for this customer.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
