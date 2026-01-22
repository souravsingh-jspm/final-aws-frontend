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
  customer_seq: number;
  order_id: string;
  customer_name: string;
  customer_phone: string;
  availability_status: "NORMAL" | "URGENT" | "MAHA_URGENT";
  status: string;
  order_created: string;
  return_expected_by: string;
  total: number;
  selected_garments: Record<string, number>;
};

type Garment = {
  garment_id: string;
  garment_name: string;
};

const GARMENT_PRIORITY = [
  "Shirt",
  "Pant",
  "Paijama",
  "Ladies",
  "Sarees",
  "Blouse",
  "Coat",
  "topi",
];


export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const [todayOrders, setTodayOrders] = useState<TodayOrder[]>([]);
  const [todayLoading, setTodayLoading] = useState(false);
  const [returnOrders, setReturnOrders] = useState<TodayOrder[]>([]);
  const [returnLoading, setReturnLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"created" | "return">("return");

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [garments, setGarments] = useState<Garment[]>([]);

function formatDateForApi(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function sortGarmentsByPriority(garments: Garment[]): Garment[] {
  const priorityMap = new Map(
    GARMENT_PRIORITY.map((name, index) => [name.toLowerCase(), index])
  );

  return [...garments].sort((a, b) => {
    const aIndex = priorityMap.get(a.garment_name.toLowerCase());
    const bIndex = priorityMap.get(b.garment_name.toLowerCase());

    // Both are in priority list → sort by defined order
    if (aIndex !== undefined && bIndex !== undefined) {
      return aIndex - bIndex;
    }

    // Only A is priority → A comes first
    if (aIndex !== undefined) return -1;

    // Only B is priority → B comes first
    if (bIndex !== undefined) return 1;

    // Neither is priority → keep stable alphabetical order
    return a.garment_name.localeCompare(b.garment_name);
  });
}
const getGarmentQty = (
  selected: Record<string, number>,
  garmentName: string
): number => {
  return selected?.[garmentName] ?? " ";
};

const tabLabelMap = {
  created: "Created Today",
  return: "Return Expected",
} as const;

const downloadTodayOrdersPdf = (
  orders: TodayOrder[],
  activeTab: "created" | "return"
) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const dateLabel = selectedDate ? formatDateForApi(selectedDate) : "";
  const tabLabel = tabLabelMap[activeTab];


  doc.setFontSize(14);
  doc.text(`${tabLabel} for ${dateLabel}`, 14, 12);

autoTable(doc, {
  startY: 18,

  styles: {
    fontSize: 8,
    cellPadding: 2,
    halign: "center",
    valign: "middle",
    lineWidth: 0.2,
    lineColor: [0, 0, 0],
  },

  headStyles: {
    fillColor: [255, 255, 255],
    textColor: 0,
    fontStyle: "bold",
    minCellHeight: 45,
    lineWidth: 0.3,
  },

  bodyStyles: {
    lineWidth: 0.2,
  },


  head: [
    [
      "Customer Id",          // index 0
      "Customer",             // index 1
      ...garments.map(() => ""), // index 2 → garments
      "Total",
      "Return By",
      "Created",
    ],
  ],


  body: orders.map((o) => [
    o.customer_seq,     // 0
    o.customer_name,          // 1
    ...garments.map((g) =>
      getGarmentQty(o.selected_garments, g.garment_name)
    ),                         // 2+
    o.total,
    new Date(o.return_expected_by).toLocaleDateString("en-GB"),
    new Date(o.order_created).toLocaleTimeString("en-GB"),
  ]),


  didDrawCell: (data) => {
    if (data.section !== "head") return;

    // Garments start AFTER:
    // Customer Id (0)
    // Customer (1)
    const garmentStartIndex = 2;
    const garmentEndIndex = garmentStartIndex + garments.length - 1;

    if (
      data.column.index >= garmentStartIndex &&
      data.column.index <= garmentEndIndex
    ) {
      const garment =
        garments[data.column.index - garmentStartIndex];

      const x = data.cell.x + data.cell.width / 2;
      const y = data.cell.y + data.cell.height - 3;

      doc.saveGraphicsState();
      doc.setFontSize(8);
      doc.text(garment.garment_name, x, y, {
        angle: 90,
        align: "left",
      });
      doc.restoreGraphicsState();
    }
  },
});


  doc.save(`Shivali-Washing-Orders-${tabLabel}-${dateLabel}.pdf`);
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

  const dateStr = formatDateForApi(selectedDate);

  setTodayLoading(true);

  fetch(`${BASE_URL}order/today-order?date=${dateStr}`)
    .then((res) => res.json())
    .then((res) => {
      setTodayOrders(Array.isArray(res.data) ? res.data : []);
    })
    .finally(() => setTodayLoading(false));
}, [selectedDate]);

 // Fetch return-expected by selected date
 useEffect(() => {
  if (!selectedDate) return;

  const dateStr = formatDateForApi(selectedDate);

  setReturnLoading(true);

  fetch(`${BASE_URL}order/return-expected?date=${dateStr}`)
    .then((res) => res.json())
  .then((res) => {
    const normalized = Array.isArray(res.data)
      ? res.data.map((o: any) => ({
          ...o,
          customer_seq: o.customer_seq ?? "-",
          customer_phone: o.customer_phone ?? "-",
        }))
      : [];
    setReturnOrders(normalized);
  })
    .finally(() => setReturnLoading(false));
}, [selectedDate]);


  useEffect(() => {

  fetch(`${BASE_URL}garment/garment`)
    .then((res) => res.json())
    .then((res) => {
      const sorted = sortGarmentsByPriority(
        Array.isArray(res.data) ? res.data : []
);
setGarments(sorted);    })
}, []);


  if (loading) return <div className="dashboard__loading">Loading...</div>;
  if (!data) return null;

  const isReturnTab = activeTab === "return";
  const visibleOrders = isReturnTab ? returnOrders : todayOrders;
  const isLoading = isReturnTab ? returnLoading : todayLoading;

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
              onClick={() => downloadTodayOrdersPdf(visibleOrders, activeTab)}
              disabled={visibleOrders.length === 0}
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

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <button
            onClick={() => setActiveTab("return")}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: isReturnTab ? "#0ea5e9" : "#f8fafc",
              color: isReturnTab ? "#fff" : "#0f172a",
              cursor: "pointer",
              fontWeight: 600,
              boxShadow: isReturnTab ? "0 3px 10px rgba(14,165,233,0.35)" : "none",
            }}
          >
            Today's Return
          </button>
          <button
            onClick={() => setActiveTab("created")}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: !isReturnTab ? "#22c55e" : "#f8fafc",
              color: !isReturnTab ? "#fff" : "#0f172a",
              cursor: "pointer",
              fontWeight: 600,
              boxShadow: !isReturnTab ? "0 3px 10px rgba(34,197,94,0.35)" : "none",
            }}
          >
            Today's Created
          </button>
        </div>

        {isLoading ? (
          <div>Loading orders…</div>
        ) : visibleOrders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <div className="customer__table-wrapper">
                <table className="customer__table">
                  <thead>
                    <tr>
                  <th className="sticky-left">Customer ID</th>
                  <th className="sticky-left-1">Customer</th>
                  <th className="sticky-left-2">Phone</th>
                      {garments.map((g) => (
                        <th
                          key={g.garment_id}
                          className="vertical-header"
                        >
                          <div>{g.garment_name}</div>
                        </th>
                      ))}

                      <th>Total</th>
                      <th>Availability</th>
                      <th>Status</th>
                      <th>Return By</th>
                      <th>Created</th>
                    </tr>
                  </thead>

                  <tbody>
                    {visibleOrders.map((o) => (
                      <tr key={o.order_id}>
                        <td className="sticky-left">{o.customer_seq}</td>
                        <td className="sticky-left-1">{o.customer_name}</td>
                        <td className="sticky-left-2">{o.customer_phone}</td>

                      {garments.map((g) => (
                        <td key={g.garment_id} className="garment-cell">
                          {getGarmentQty(o.selected_garments, g.garment_name)}
                        </td>
                      ))}
                        <td>{o.total}</td>
                        <td>{o.availability_status}</td>
                        <td>{o.status}</td>
                        <td>
                          {new Date(o.return_expected_by).toLocaleDateString("en-GB")}
                        </td>
                        <td>
                          {new Date(o.order_created).toLocaleTimeString("en-GB")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>

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
