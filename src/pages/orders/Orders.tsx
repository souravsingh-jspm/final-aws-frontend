type Order = {
  order_id: string;
  customer_id: string;
  quantity: number;
  availability_status: "NORMAL" | "URGENT" | "MAHA_URGENT";
  return_expected_by: string;
  created_at?: string;
};

import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant/appConstant";
import { useNavigate } from "react-router-dom";

const ORDER_BASE = BASE_URL + "order/order";

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(ORDER_BASE)
      .then((r) => r.json())
      .then((res) => setOrders(res.data ?? res))
      .catch(() => setError("Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  async function deleteOrder(orderId: string) {
    if (!confirm("Are you sure you want to delete this order?")) return;

    await fetch(`${ORDER_BASE}/${orderId}`, { method: "DELETE" });
    setOrders((p) => p.filter((o) => o.order_id !== orderId));
  }

  if (loading) return <div className="p-6">Loading orders…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>

      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm">Order ID</th>
              <th className="px-4 py-2 text-left text-sm">Quantity</th>
              <th className="px-4 py-2 text-left text-sm">Urgency</th>
              <th className="px-4 py-2 text-left text-sm">Return Date</th>
              <th className="px-4 py-2 text-right text-sm">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {orders.map((o) => (
              <tr key={o.order_id}>
                <td className="px-4 py-2">{o.order_id}</td>
                <td className="px-4 py-2">{o.quantity}</td>
                <td className="px-4 py-2">{o.availability_status}</td>
                <td className="px-4 py-2">
                  {new Date(o.return_expected_by).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/orders/view/${o.order_id}`)}
                  >
                    View 
                  </button>
                  <button
                    className="text-yellow-600 hover:underline"
                    onClick={() => navigate(`/orders/edit/${o.order_id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteOrder(o.order_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
