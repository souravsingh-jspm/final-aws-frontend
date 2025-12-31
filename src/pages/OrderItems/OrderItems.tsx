import React, { JSX, useEffect, useState } from "react";
import DatePicker from "../../components/DatePicker";
import { BASE_URL } from "../../constant/appConstant";
import { Combobox } from "@headlessui/react";
import { Fragment, useMemo } from "react";

type Customer = { customer_id: string; customer_name: string };
type Garment = { garment_id: string; garment_name: string };
type Service = { service_id: string; service_name: string; garment_id: string };

type ItemRow = {
  id: string;
  garment_id?: string;
  service_id?: string;
  quantity?: number;
};

const CUSTOMER_BASE = BASE_URL + "customer/customer";
const GARMENT_BASE = BASE_URL + "garment/garment";
const SERVICE_BASE = BASE_URL + "service/service";
const ORDER_BASE = BASE_URL + "order/order";
const ORDER_ITEM_BASE = BASE_URL + "order-item/order-item";

function uid(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

function unwrapArray<T>(raw: any): T[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as T[];
  if (raw && Array.isArray(raw.data)) return raw.data as T[];
  if (raw && Array.isArray(raw.items)) return raw.items as T[];
  return [];
}

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
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
  if (Array.isArray(raw) && raw.length > 0) return raw[0] as T;
  if (raw && typeof raw === "object" && ("order_id" in raw || "id" in raw))
    return raw as T;
  return null;
}

export default function OrderCreator(): JSX.Element {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [garments, setGarments] = useState<Garment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [customerQuery, setCustomerQuery] = useState("");
  const debouncedCustomerQuery = useDebounce(customerQuery, 300);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [customerId, setCustomerId] = useState<string>("");
  const [items, setItems] = useState<ItemRow[]>([
    {
      id: uid("r_"),
      quantity: 1,
    },
  ]);

  const [orderAvailability, setOrderAvailability] = useState<
    "MAHA_URGENT" | "URGENT" | "NORMAL" | string | undefined
  >("NORMAL");
  const [orderReturnExpectedBy, setOrderReturnExpectedBy] = useState<
    string | undefined
  >(undefined); // ISO string

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const selectedCustomer =
    customers.find((c) => c.customer_id === customerId) ?? null;

  const filteredCustomers = useMemo(() => {
    if (!debouncedCustomerQuery) return customers;
    return customers.filter((c) =>
      c.customer_name
        .toLowerCase()
        .includes(debouncedCustomerQuery.toLowerCase())
    );
  }, [customers, debouncedCustomerQuery]);
  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    setError(null);
    try {
      const [cRes, gRes, sRes] = await Promise.all([
        fetch(CUSTOMER_BASE, { method: "GET" }).then((r) =>
          r.json().catch(() => null)
        ),
        fetch(GARMENT_BASE, { method: "GET" }).then((r) =>
          r.json().catch(() => null)
        ),
        fetch(SERVICE_BASE, { method: "GET" }).then((r) =>
          r.json().catch(() => null)
        ),
      ]);
      setCustomers(unwrapArray<Customer>(cRes));
      setGarments(unwrapArray<Garment>(gRes));
      setServices(unwrapArray<Service>(sRes));
    } catch (err) {
      setError("Failed to load initial data");
    } finally {
      setLoading(false);
    }
  }

  function addRow() {
    setItems((p) => [...p, { id: uid("r_"), quantity: 1 }]);
  }
  function removeRow(id: string) {
    setItems((p) => p.filter((r) => r.id !== id));
  }
  function updateRow(id: string, patch: Partial<ItemRow>) {
    setItems((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function servicesForGarment(garment_id?: string) {
    if (!garment_id) return [] as Service[];
    return services.filter((s) => s.garment_id === garment_id);
  }

  function validateForm() {
    if (!customerId) return "Please select a customer.";
    if (!items || items.length === 0) return "Add at least one order item.";
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.garment_id) return `Select garment for item ${i + 1}.`;
      if (!it.service_id) return `Select service for item ${i + 1}.`;
      if (!it.quantity || it.quantity < 1)
        return `Quantity for item ${i + 1} must be at least 1.`;
    }
    if (!orderReturnExpectedBy)
      return "Please select the expected return date for the order.";
    if (!orderAvailability) return "Please select availability for the order.";

    return null;
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const v = validateForm();
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);
    try {
      const total_quantity = items.reduce(
        (sum, item) => sum + (item.quantity ?? 0),
        0
      );

      const ordPayload = {
        customer_id: customerId,
        availability_status: orderAvailability,
        return_expected_by: orderReturnExpectedBy,
        quantity: total_quantity,
      };

      const ordRes = await fetch(ORDER_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ordPayload),
      });

      if (!ordRes.ok) {
        const raw = await ordRes.json().catch(() => null);
        const msg = raw?.message || `Failed to create order: ${ordRes.status}`;
        throw new Error(msg);
      }

      const ordRaw = await ordRes.json().catch(() => null);
      const createdOrder =
        unwrapSingle<{ order_id: string }>(ordRaw) || ordRaw?.data || ordRaw;
      const order_id = createdOrder?.order_id;
      if (!order_id)
        throw new Error("Order created but server did not return order_id.");

      // 2) create all items for that order (parallel). Items do NOT include order-level fields.
      const itemPromises = items.map(async (it) => {
        const itemPayload = {
          order_id,
          garment_id: it.garment_id,
          service_id: it.service_id,
          quantity: it.quantity,
        };

        const itemRes = await fetch(ORDER_ITEM_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemPayload),
        });
        if (!itemRes.ok) {
          const raw = await itemRes.json().catch(() => null);
          const msg =
            raw?.message || `Failed to create order item: ${itemRes.status}`;
          throw new Error(msg);
        }
        return itemRes;
      });

      await Promise.all(itemPromises);

      setSuccessMsg("Order and items created successfully.");
      setItems([{ id: uid("r_"), quantity: 1 }]);
      setCustomerId("");
      setOrderAvailability("NORMAL");
      setOrderReturnExpectedBy(undefined);
      await loadAll();
    } catch (err: any) {
      setError(err?.message || "Failed to create order");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Create New Order</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create an order and one or more items.
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
              onChange={(c: Customer | null) => {
                setCustomerId(c ? c.customer_id : "");
              }}
              disabled={submitting}
            >
              <div className="relative">
                <Combobox.Input
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  displayValue={(c: Customer) => c?.customer_name ?? ""}
                  onChange={(e) => setCustomerQuery(e.target.value)}
                  placeholder="Search customer…"
                  aria-label="Select customer"
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
                Availability (applies to whole order)
              </label>
              <select
                className="w-full border rounded-md p-2"
                value={orderAvailability ?? "NORMAL"}
                onChange={(e) =>
                  setOrderAvailability(
                    e.target.value as
                      | "MAHA_URGENT"
                      | "NORMAL"
                      | "URGENT"
                      | string
                  )
                }
                disabled={submitting}
                aria-label="Order availability"
              >
                <option value="URGENT">URGENT</option>
                <option value="NORMAL">NORMAL</option>
                <option value="MAHA_URGENT">MAHA_URGENT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return expected (applies to whole order)
              </label>
              <DatePicker
                value={
                  orderReturnExpectedBy ? new Date(orderReturnExpectedBy) : null
                }
                onChange={(d) =>
                  setOrderReturnExpectedBy(d ? d.toISOString() : undefined)
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
            <button
              type="button"
              onClick={addRow}
              className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-md bg-blue-600 text-white hover:bg-blue-700"
              disabled={submitting}
            >
              + Add item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-sm text-gray-600">
                    Garment
                  </th>
                  <th className="px-3 py-2 text-left text-sm text-gray-600">
                    Service
                  </th>
                  <th className="px-3 py-2 text-left text-sm text-gray-600">
                    Quantity
                  </th>
                  <th className="px-3 py-2 text-right text-sm text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {items.map((row, idx) => (
                  <tr key={row.id} className="align-top">
                    <td className="px-3 py-2 w-1/5">
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
                        aria-label={`Garment for item ${idx + 1}`}
                      >
                        <option value="">select garment</option>
                        {garments.map((g) => (
                          <option key={g.garment_id} value={g.garment_id}>
                            {g.garment_name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-3 py-2 w-1/5">
                      <select
                        className="w-full border rounded-md p-2"
                        value={row.service_id ?? ""}
                        onChange={(e) =>
                          updateRow(row.id, {
                            service_id: e.target.value || undefined,
                          })
                        }
                        disabled={submitting || !row.garment_id}
                        aria-label={`Service for item ${idx + 1}`}
                      >
                        <option value="">select service</option>
                        {servicesForGarment(row.garment_id).map((s) => (
                          <option key={s.service_id} value={s.service_id}>
                            {s.service_name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-3 py-2 w-1/12">
                      <input
                        type="number"
                        min={1}
                        className="w-full border rounded-md p-2"
                        value={row.quantity ?? 1}
                        onChange={(e) =>
                          updateRow(row.id, {
                            quantity: Number(e.target.value) || 1,
                          })
                        }
                        disabled={submitting}
                        aria-label={`Quantity for item ${idx + 1}`}
                      />
                    </td>

                    <td className="px-3 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
                        className="px-3 py-1 text-sm text-red-600 border rounded-md bg-white hover:bg-gray-50"
                        disabled={submitting}
                        aria-label={`Remove item ${idx + 1}`}
                      >
                        Remove
                      </button>
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
          <button
            type="button"
            onClick={() => {
              setItems([{ id: uid("r_"), quantity: 1 }]);
              setCustomerId("");
              setOrderAvailability("NORMAL");
              setOrderReturnExpectedBy(undefined);
              setError(null);
              setSuccessMsg(null);
            }}
            className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50"
            disabled={submitting}
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => handleSubmit()}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Create Order"}
          </button>
        </footer>
      </main>
    </div>
  );
}
