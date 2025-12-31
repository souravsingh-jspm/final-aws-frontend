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
  const downloadTodayOrdersPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Today's Orders", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [
        [
          "Order ID",
          "Customer",
          "Phone",
          "Quantity",
          "Availability",
          "Status",
          "Created At",
        ],
      ],
      body: todayOrders.map((o) => [
        o.order_id,
        o.customer_name,
        o.customer_phone,
        o.quantity,
        o.availability_status,
        o.status,
        new Date(o.order_created).toLocaleString(),
      ]),
    });

    doc.save(`today-orders-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  useEffect(() => {
    fetch(`${BASE_URL}dashboard/dashboard`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setTodayLoading(true);

    fetch(`${BASE_URL}order/today-order`)
      .then((res) => res.json())
      .then((res) => {
        setTodayOrders(Array.isArray(res.data) ? res.data : []);
      })
      .finally(() => setTodayLoading(false));
  }, []);

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

      {/* ORDERS STATUS */}
      {/* <section className="dashboard__section">
        <h3>Order Status</h3>
        <div className="dashboard__grid">
          <StatusItem label="Pending" value={data.orders.pending} />
          <StatusItem label="In Progress" value={data.orders.in_progress} />
          <StatusItem label="Completed" value={data.orders.completed} />
          <StatusItem label="Delivered" value={data.orders.delivered} />
          <StatusItem label="Cancelled" value={data.orders.cancelled} />
        </div>
      </section> */}

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

      <section className="dashboard__section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <h3>Today's Orders</h3>

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
            }}
          >
            Download PDF
          </button>
        </div>

        {todayLoading ? (
          <div>Loading today’s orders…</div>
        ) : todayOrders.length === 0 ? (
          <div>No orders today.</div>
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
