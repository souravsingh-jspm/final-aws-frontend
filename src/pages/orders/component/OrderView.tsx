import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/constant/appConstant";

type Order = {
  order_id: string;
  customer_id: string;
  quantity: number;
  availability_status: "NORMAL" | "URGENT" | "MAHA_URGENT";
  return_expected_by: string;
};

type OrderItem = {
  order_item_id: string;
  garment_id: string;
  service_id: string;
  quantity: number;
};

const ORDER_BASE = BASE_URL + "order/order";
const ORDER_ITEM_BASE = BASE_URL + "order-item/order-item";

export default function OrderView() {
  const { id } = useParams(); // ✅ MATCHES BACKEND
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid order id");
      setLoading(false);
      return;
    }

    setLoading(true);

    Promise.all([
      fetch(`${ORDER_BASE}/${id}`),
      fetch(`${ORDER_ITEM_BASE}/${id}`),
    ])
      .then(async ([orderRes, itemRes]) => {
        if (!orderRes.ok || !itemRes.ok) {
          throw new Error("API request failed");
        }

        const orderJson = await orderRes.json();
        const itemJson = await itemRes.json();

        setOrder(orderJson.data ?? orderJson);
        setItems(itemJson.data ?? itemJson);
      })
      .catch(() => setError("Failed to load order details"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading order…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!order) return <div className="p-6">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Order Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1.5 border rounded-md bg-white hover:bg-gray-50"
        >
          Back
        </button>
      </header>

      <section className="bg-white border rounded-lg p-4 shadow-sm space-y-2">
        <div><strong>Order ID:</strong> {order.order_id}</div>
        <div><strong>Customer ID:</strong> {order.customer_id}</div>
        <div><strong>Urgency:</strong> {order.availability_status}</div>
        <div><strong>Quantity:</strong> {order.quantity}</div>
        <div>
          <strong>Return Date:</strong>{" "}
          {new Date(order.return_expected_by).toLocaleDateString()}
        </div>
      </section>

      <section className="bg-white border rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-medium mb-3">Order Items</h2>

        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-sm">Garment</th>
              <th className="px-3 py-2 text-left text-sm">Service</th>
              <th className="px-3 py-2 text-left text-sm">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((i) => (
              <tr key={i.order_item_id}>
                <td className="px-3 py-2">{i.garment_id}</td>
                <td className="px-3 py-2">{i.service_id}</td>
                <td className="px-3 py-2">{i.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
