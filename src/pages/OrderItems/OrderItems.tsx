import { JSX, useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "../../components/DatePicker";
import { BASE_URL } from "../../constant/appConstant";
import { Combobox } from "@headlessui/react";
import CustomButton from "@/components/buttons/CustomButton";

type Customer = { customer_id: string; customer_name: string };
type Garment = { garment_id: string; garment_name: string };
type Service = { service_id: string; service_name: string; garment_id: string };

type ItemRow = {
  id: string;                 
  order_item_id?: string;     
  garment_id?: string;
  service_id?: string;        
  quantity: number;
};

const CUSTOMER_BASE = BASE_URL + "customer/customer";
const GARMENT_BASE = BASE_URL + "garment/garment";
const SERVICE_BASE = BASE_URL + "service/service";
const ORDER_BASE = BASE_URL + "order/order";
const ORDER_ITEM_BASE = BASE_URL + "order-item/order-item";
const ORDER_SPECIAL_BASE = BASE_URL + "order/order/special";

const uid = (p = "") => p + Math.random().toString(36).slice(2, 9);

function unwrapArray<T>(raw: any): T[] {
  if (Array.isArray(raw)) return raw;
  if (raw?.data && Array.isArray(raw.data)) return raw.data;
  return [];
}

function useDebounce<T>(value: T, delay = 300): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function OrderCreator(): JSX.Element {
  const { id: orderIdParam } = useParams<{ id: string }>();
  const isEditMode = Boolean(orderIdParam);
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [garments, setGarments] = useState<Garment[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [customerQuery, setCustomerQuery] = useState("");
  const debouncedCustomerQuery = useDebounce(customerQuery);

  const [availability, setAvailability] = useState<
    "MAHA_URGENT" | "URGENT" | "NORMAL"
  >("NORMAL");

  const [returnExpectedBy, setReturnExpectedBy] = useState<string>();
  const [items, setItems] = useState<ItemRow[]>([
    { id: uid("r_"), quantity: 1 },
  ]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const selectedCustomer =
    customers.find((c) => c.customer_id === customerId) ?? null;

  const filteredCustomers = !debouncedCustomerQuery
    ? customers
    : customers.filter((c) =>
        c.customer_name
          .toLowerCase()
          .includes(debouncedCustomerQuery.toLowerCase())
      );

  function servicesForGarment(garmentId?: string) {
    return services.filter((s) => s.garment_id === garmentId);
  }

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(CUSTOMER_BASE).then((r) => r.json()),
      fetch(GARMENT_BASE).then((r) => r.json()),
      fetch(SERVICE_BASE).then((r) => r.json()),
    ])
      .then(([c, g, s]) => {
        setCustomers(unwrapArray<Customer>(c));
        setGarments(unwrapArray<Garment>(g));
        setServices(unwrapArray<Service>(s));
      })
      .catch(() => setError("Failed to load initial data"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (
      !isEditMode ||
      !orderIdParam ||
      customers.length === 0 ||
      garments.length === 0
    )
      return;

    fetch(`${ORDER_SPECIAL_BASE}/${orderIdParam}`)
      .then((r) => r.json())
      .then((res) => {
        const data = res.data;

        setCustomerId(data.customer.customer_id);
        setAvailability(data.availability_status);
        setReturnExpectedBy(data.return_expected_by);

        setItems(
          data.items.map((it: any) => ({
            id: uid("r_"),
            order_item_id: it.order_item_id,
            garment_id: it.garment_id,
            quantity: it.quantity,
            service_id: undefined, // ✅ Option 1
          }))
        );
      })
      .catch(() => setError("Failed to load order for editing"));
  }, [isEditMode, orderIdParam, customers.length, garments.length]);

  function updateRow(id: string, patch: Partial<ItemRow>) {
    setItems((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function validate() {
    if (!customerId) return "Please select a customer.";
    if (!returnExpectedBy)
      return "Please select the expected return date.";

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.garment_id) return `Select garment for item ${i + 1}.`;
      if (!it.service_id) return `Select service for item ${i + 1}.`;
      if (it.quantity < 1)
        return `Quantity for item ${i + 1} must be at least 1.`;
    }
    return null;
  }

  async function handleSubmit() {
    setError(null);
    setSuccessMsg(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);

    try {
      const totalQuantity = items.reduce((s, i) => s + i.quantity, 0);
      let orderId = orderIdParam;

      if (isEditMode && orderId) {
        await fetch(`${ORDER_BASE}/${orderId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            availability_status: availability,
            return_expected_by: returnExpectedBy,
            quantity: totalQuantity,
          }),
        });
      } else {
        const orderRes = await fetch(ORDER_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_id: customerId,
            availability_status: availability,
            return_expected_by: returnExpectedBy,
            quantity: totalQuantity,
          }),
        });

        const { data } = await orderRes.json();
        orderId = data.order_id;
      }

      for (const item of items) {
        if (item.order_item_id) {
          await fetch(`${ORDER_ITEM_BASE}/${item.order_item_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              garment_id: item.garment_id,
              quantity: item.quantity,
            }),
          });
        } else {
          await fetch(ORDER_ITEM_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              order_id: orderId,
              garment_id: item.garment_id,
              service_id: item.service_id,
              quantity: item.quantity,
            }),
          });
        }
      }

      setSuccessMsg(isEditMode ? "Order updated successfully." : "Order created successfully.");
      navigate("/orders");

    } catch (e: any) {
      setError(e.message ?? "Failed to save order");
    } finally {
      setSubmitting(false);
    }
  }

  const hasMissingService = items.some((i) => !i.service_id);

  return (
<>
return (
  <div className="max-w-4xl mx-auto p-6">
    <header className="mb-6">
      <h1 className="text-2xl font-semibold">
        {isEditMode ? "Edit Order" : "Create New Order"}
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        {isEditMode
          ? "Update order details and items."
          : "Create an order and one or more items."}
      </p>
    </header>

    <main className="space-y-6">
      <section className="bg-white border rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-medium mb-3">Customer</h2>

        {loading ? (
          <div className="text-sm text-gray-500">Loading customers…</div>
        ) : (
          <Combobox
            value={selectedCustomer}
            onChange={(c: Customer | null) =>
              setCustomerId(c ? c.customer_id : "")
            }
            disabled={submitting || isEditMode}
          >
            <div className="relative">
              <Combobox.Input
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                displayValue={(c: Customer) => c?.customer_name ?? ""}
                onChange={(e) => setCustomerQuery(e.target.value)}
                placeholder="Search customer…"
              />

              <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg">
                {filteredCustomers.length === 0 && customerQuery !== "" && (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No customers found
                  </div>
                )}

                {filteredCustomers.map((customer) => (
                  <Combobox.Option
                    key={customer.customer_id}
                    value={customer}
                    as={Fragment}
                  >
                    {({ active, selected }) => (
                      <li
                        className={`cursor-pointer px-3 py-2 text-sm ${
                          active ? "bg-blue-600 text-white" : ""
                        }`}
                      >
                        {customer.customer_name}
                        {selected && (
                          <span className="ml-2 text-xs opacity-70">✓</span>
                        )}
                      </li>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
        )}
      </section>

      <section className="bg-white border rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-medium mb-3">Order details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              className="w-full border rounded-md p-2"
              value={availability}
              onChange={(e) =>
                setAvailability(
                  e.target.value as "NORMAL" | "URGENT" | "MAHA_URGENT"
                )
              }
              disabled={submitting}
            >
              <option value="URGENT">URGENT</option>
              <option value="NORMAL">NORMAL</option>
              <option value="MAHA_URGENT">MAHA_URGENT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return expected
            </label>
            <DatePicker
              value={returnExpectedBy ? new Date(returnExpectedBy) : null}
              onChange={(d) =>
                setReturnExpectedBy(d ? d.toISOString() : undefined)
              }
              minDate={new Date(2020, 0, 1)}
              maxDate={new Date(2030, 11, 31)}
              placeholder="Choose return date"
            />
          </div>
        </div>
      </section>

      <section className="bg-white border rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-medium">Order Items</h2>
          <CustomButton
            onClick={() =>
              setItems((p) => [...p, { id: uid("r_"), quantity: 1 }])
            }
            disabled={submitting}
          >
            + Add item
          </CustomButton>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-sm">Garment</th>
                <th className="px-3 py-2 text-left text-sm">Service</th>
                <th className="px-3 py-2 text-left text-sm">Quantity</th>
                <th className="px-3 py-2 text-right text-sm">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {items.map((row) => (
                <tr key={row.id}>
                  <td className="px-3 py-2">
                    <select
                      className="w-full border rounded-md p-2"
                      value={row.garment_id ?? ""}
                      onChange={(e) =>
                        updateRow(row.id, {
                          garment_id: e.target.value || undefined,
                          service_id: undefined,
                        })
                      }
                      disabled={submitting}
                    >
                      <option value="">Select garment</option>
                      {garments.map((g) => (
                        <option key={g.garment_id} value={g.garment_id}>
                          {g.garment_name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-3 py-2">
                    <select
                      className="w-full border rounded-md p-2"
                      value={row.service_id ?? ""}
                      onChange={(e) =>
                        updateRow(row.id, {
                          service_id: e.target.value || undefined,
                        })
                      }
                      disabled={submitting || !row.garment_id}
                    >
                      <option value="">Select service</option>
                      {servicesForGarment(row.garment_id).map((s) => (
                        <option key={s.service_id} value={s.service_id}>
                          {s.service_name}
                        </option>
                      ))}
                    </select>

                    {isEditMode && !row.service_id && (
                      <p className="text-xs text-gray-500 mt-1">
                        Please re-select service
                      </p>
                    )}
                  </td>

                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min={1}
                      className="w-full border rounded-md p-2"
                      value={row.quantity}
                      onChange={(e) =>
                        updateRow(row.id, {
                          quantity: Number(e.target.value) || 1,
                        })
                      }
                      disabled={submitting}
                    />
                  </td>

                  <td className="px-3 py-2 text-right">
                    <CustomButton
                      variant="danger"
                      onClick={async () => {
                        if (row.order_item_id) {
                          await fetch(
                            `${ORDER_ITEM_BASE}/${row.order_item_id}`,
                            { method: "DELETE" }
                          );
                        }
                        setItems((p) => p.filter((r) => r.id !== row.id));
                      }}
                    >
                      Remove
                    </CustomButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {(error || successMsg) && (
        <div className="p-3 rounded-md">
          {error && <div className="text-sm text-red-700">{error}</div>}
          {successMsg && (
            <div className="text-sm text-green-700">{successMsg}</div>
          )}
        </div>
      )}

      <footer className="flex justify-end gap-3">
        <CustomButton
          variant="ghost"
          onClick={() => navigate(-1)}
          disabled={submitting}
        >
          Cancel
        </CustomButton>

        <CustomButton
          onClick={handleSubmit}
          disabled={submitting || hasMissingService}
        >
          {isEditMode ? "Update Order" : "Create Order"}
        </CustomButton>
      </footer>
    </main>
  </div>
);

</>
  );
}