import { BASE_URL } from "../../constant/appConstant";
import "./Dashboard.css";
import { useEffect, useState } from "react";

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

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}dashboard/dashboard`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
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
