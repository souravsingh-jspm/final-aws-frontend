import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant/appConstant";
import { Link } from "react-router-dom";
import CustomButton from "@/components/buttons/CustomButton";

type OrderRow = {
  customer_seq: number;
  customer_name: string;
  customer_id: string;
  order_id: string;
  return_expected_by: string;
  created_at: string;
  availability_status: "NORMAL" | "URGENT" | "MAHA_URGENT";
  status: string;
};

const ORDER_STATUS_OPTIONS = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;

type OrderStatus = typeof ORDER_STATUS_OPTIONS[number];


const ORDER_BASE = BASE_URL + "order/order";

export default function OrderList() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
  try {
    // Optimistic UI update
    setOrders((prev) =>
      prev.map((o) =>
        o.order_id === orderId ? { ...o, status: newStatus } : o
      )
    );

    await fetch(`${BASE_URL}order/order/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
  } catch (err) {
    console.error(err);
    setError("Failed to update order status");
  }
};


  useEffect(() => {
    fetch(ORDER_BASE)
      .then((r) => r.json())
      .then((res) => setOrders(res.data ?? res))
      .catch(() => setError("Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading orders…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>

      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-sm">Customer Id</th>
              <th className="px-3 py-2 text-left text-sm">Customer</th>
              <th className="px-3 py-2 text-left text-sm">Urgency</th>
              <th className="px-3 py-2 text-left text-sm">Status</th>
              <th className="px-3 py-2 text-left text-sm">Created Date</th>
              <th className="px-3 py-2 text-left text-sm">Return Date</th>
              <th className="px-3 py-2 text-center text-sm">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td className="px-3 py-2">{order.customer_seq}</td>
                <td className="px-3 py-2">{order.customer_name}</td>
                <td className="px-3 py-2">
                  {order.availability_status}
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
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-3 py-2">
                  {new Date(order.return_expected_by).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 text-center">
                              <Link to={`/orders/history/${order.customer_id}`}>
                        <CustomButton variant="primary">
                        View History
                        </CustomButton>
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
