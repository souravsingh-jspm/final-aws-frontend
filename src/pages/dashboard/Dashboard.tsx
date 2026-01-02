import DatePicker from "../../components/DatePicker";
import { BASE_URL } from "../../constant/appConstant";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type DashboardData = {
  users: number;
  customers: number;
  today_orders: number;
  orders: {
    total: number;
    pending: number;
    in_progress: number;
    completed: number;
    delivered: number;
    cancelled: number;
  };
  availability: {
    maha_urgent: number;
    urgent: number;
    normal: number;
  };
};

type TodayOrder = {
  order_id: string;
  customer_name: string;
  customer_phone: string;
  quantity: number;
  availability_status: string;
  status: string;
  order_created: string;
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const [todayOrders, setTodayOrders] = useState<TodayOrder[]>([]);
  const [todayLoading, setTodayLoading] = useState(false);

  // NEW: selected date state
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const downloadTodayOrdersPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);

    autoTable(doc, {
      startY: 20,
      head: [["Sr.no", "Name", "Phone", "Quantity", "Created"]],
      body: todayOrders.map((o, idx) => [
        idx + 1,
        o.customer_name,
        o.customer_phone,
        o.quantity,
        new Date(o.order_created).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }),
      ]),
    });
    const dateLabel = selectedDate
      ? selectedDate.toISOString().slice(0, 10)
      : "";
    doc.text(`Order Summary for ${dateLabel}`, 14, 15);
    doc.save(`New Shivali Washing Company-${dateLabel}.pdf`);
  };

  // Dashboard KPIs
  useEffect(() => {
    fetch(`${BASE_URL}dashboard/dashboard`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, []);

  // Fetch orders by selected date
  useEffect(() => {
    if (!selectedDate) return;

    const dateStr = selectedDate.toISOString().slice(0, 10);

    setTodayLoading(true);

    fetch(`${BASE_URL}order/today-order?date=${dateStr}`)
      .then((res) => res.json())
      .then((res) => {
        setTodayOrders(Array.isArray(res.data) ? res.data : []);
      })
      .finally(() => setTodayLoading(false));
  }, [selectedDate]);

  if (loading) return <div className="dashboard__loading">Loading...</div>;
  if (!data) return null;

  return (
    <div className="dashboard">
      <h2 className="dashboard__title">Dashboard</h2>

      {/* KPI CARDS */}
      <div className="dashboard__cards">
        <StatCard title="Users" value={data.users} />
        <StatCard title="Customers" value={data.customers} />
        <StatCard title="Today Orders" value={data.today_orders} />
        <StatCard title="Total Orders" value={data.orders.total} />
      </div>

      {/* AVAILABILITY */}
      <section className="dashboard__section">
        <h3>Availability</h3>
        <div className="dashboard__grid">
          <StatusItem
            label="Maha Urgent"
            value={data.availability.maha_urgent}
            danger
          />
          <StatusItem label="Urgent" value={data.availability.urgent} success />
          <StatusItem label="Normal" value={data.availability.normal} warning />
        </div>
      </section>

      {/* ORDERS BY DATE */}
      <section className="dashboard__section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.75rem",
            gap: "1rem",
          }}
        >
          <h3>Orders by Date</h3>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              allowPastDates
              placeholder="Select date"
              formatDate={(d) =>
                d.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              }
            />

            <button
              onClick={downloadTodayOrdersPdf}
              disabled={todayOrders.length === 0}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                background: "#2563eb",
                color: "#fff",
                cursor: "pointer",
                maxHeight: "40px",
              }}
            >
              Download
            </button>
          </div>
        </div>

        {todayLoading ? (
          <div>Loading orders…</div>
        ) : todayOrders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="customer__table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Qty</th>
                  <th>Availability</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {todayOrders.map((o) => (
                  <tr key={o.order_id}>
                    <td>{o.customer_name}</td>
                    <td>{o.customer_phone}</td>
                    <td>{o.quantity}</td>
                    <td>{o.availability_status}</td>
                    <td>{o.status}</td>
                    <td>{new Date(o.order_created).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="stat-card">
      <span className="stat-card__title">{title}</span>
      <span className="stat-card__value">{value}</span>
    </div>
  );
}

function StatusItem({
  label,
  value,
  danger,
  warning,
  success,
}: {
  label: string;
  value: number;
  danger?: boolean;
  warning?: boolean;
  success?: boolean;
}) {
  return (
    <div
      className={`status-item ${
        danger ? "danger" : warning ? "warning" : success ? "success" : ""
      }`}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
