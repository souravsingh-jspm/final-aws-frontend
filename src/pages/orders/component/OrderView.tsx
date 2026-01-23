import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/constant/appConstant";
import CustomButton from "@/components/buttons/CustomButton";

const ORDER_SPECIAL_BASE = BASE_URL + "order/order/special";

type OrderSpecialResponse = {
  return_expected_by: string;
  createdAt: string;
  customer: {
    customer_name: string;
    customer_phone: string;
    customer_seq: number;
    customer_address: string | null;
  };
  items: {
    quantity: number;
    garment: {
      garment_name: string;
    };
  }[];
};

export default function OrderView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderSpecialResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid order id");
      setLoading(false);
      return;
    }

    fetch(`${ORDER_SPECIAL_BASE}/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch order");
        return r.json();
      })
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load order details");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading order…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!order) return <div className="p-6">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Order Details</h1>
        <CustomButton variant="ghost" onClick={() => navigate(-1)}>
          Back
        </CustomButton>
      </div>

      {/* Customer & Order Info */}
      <section className="bg-white border rounded-lg p-4 shadow-sm space-y-2">
        <div>
          <strong>Customer Name:</strong> {order.customer.customer_name}
        </div>
        <div>
          <strong>Customer Seq:</strong> {order.customer.customer_seq}
        </div>
        <div>
          <strong>Customer Phone:</strong> {order.customer.customer_phone}
        </div>
        <div>
          <strong>Return Expected By:</strong>{" "}
          {new Date(order.return_expected_by).toLocaleDateString()}
        </div>
        <div>
          <strong>Created At:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </div>
      </section>

      {/* Order Items */}
      <section className="bg-white border rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-medium mb-3">Order Items</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-sm text-gray-600">
                  Garment
                </th>
                <th className="px-3 py-2 text-left text-sm text-gray-600">
                  Quantity
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-3 py-2">
                    {item.garment.garment_name}
                  </td>
                  <td className="px-3 py-2">{item.quantity}</td>
                </tr>
              ))}

              {order.items.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="px-3 py-4 text-center text-gray-500"
                  >
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
