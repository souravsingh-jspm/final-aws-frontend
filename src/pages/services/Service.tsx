// src/components/ServiceCrud.tsx
import React, { JSX, useEffect, useState } from "react";

/**
 * Types returned by API
 */
type Garment = {
  garment_id: string;
  garment_name: string;
};

type Service = {
  service_id: string;
  service_name: string;
  is_active: boolean;
  garment_id: string;
  // optional: backend may include nested garment object
  garment?: Garment | null;
};

const GARMENT_BASE = "http://localhost:3001/garment/garment";
const SERVICE_BASE = "http://localhost:3001/service/service";

/* ---------- helpers to handle wrapped API responses ---------- */
function unwrapArray<T>(raw: any): T[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  if (raw && Array.isArray(raw.items)) return raw.items;
  return [];
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
  if (raw && typeof raw === "object" && ("service_id" in raw || "id" in raw))
    return raw as T;
  return null;
}

/* ---------- Simple Modal ---------- */
const Modal: React.FC<{
  visible: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ visible, title, onClose, children }) => {
  if (!visible) return null;
  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <strong>{title ?? "Modal"}</strong>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
            ×
          </button>
        </div>
        <div style={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

/* ---------- Main component ---------- */
export default function ServiceCrud(): JSX.Element {
  const [services, setServices] = useState<Service[]>([]);
  const [garments, setGarments] = useState<Garment[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingGarments, setLoadingGarments] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // modal/form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [name, setName] = useState("");
  const [garmentId, setGarmentId] = useState<string>("");
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    fetchGarments();
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- data fetchers ---------- */
  async function fetchGarments() {
    setLoadingGarments(true);
    try {
      const res = await fetch(GARMENT_BASE, { method: "GET" });
      const raw = await res.json().catch(() => null);
      console.debug("GET garments raw:", raw);
      const list = unwrapArray<Garment>(raw);
      setGarments(list);
    } catch (err: any) {
      console.error(err);
      setGarments([]);
    } finally {
      setLoadingGarments(false);
    }
  }

  async function fetchServices() {
    setLoadingServices(true);
    setError(null);
    try {
      const res = await fetch(SERVICE_BASE, { method: "GET" });
      const raw = await res.json().catch(() => null);
      console.debug("GET services raw:", raw);
      const list = unwrapArray<Service>(raw);
      setServices(list);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load services");
      setServices([]);
    } finally {
      setLoadingServices(false);
    }
  }

  /* ---------- modal controls ---------- */
  function openCreate() {
    setEditing(null);
    setName("");
    setGarmentId("");
    setIsActive(true);
    setValidationError(null);
    setModalOpen(true);
  }
  function openEdit(s: Service) {
    setEditing(s);
    setName(s.service_name);
    setGarmentId(s.garment_id);
    setIsActive(Boolean(s.is_active));
    setValidationError(null);
    setModalOpen(true);
  }
  function closeModal() {
    if (submitting) return;
    setModalOpen(false);
  }

  /* ---------- validation ---------- */
  function validate() {
    if (!name.trim()) return "Service name is required.";
    if (!garmentId) return "Please select a garment.";
    if (name.trim().length > 255) return "Name is too long.";
    return null;
  }

  /* ---------- form submit (create/update) ---------- */
  async function submitForm(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setValidationError(null);
    const v = validate();
    if (v) {
      setValidationError(v);
      return;
    }
    setSubmitting(true);
    try {
      if (editing) {
        const res = await fetch(
          `${SERVICE_BASE}/${encodeURIComponent(editing.service_id)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              service_name: name.trim(),
              is_active: isActive,
              garment_id: garmentId,
            }),
          }
        );
        const raw = await res.json().catch(() => null);
        console.debug("PUT service raw:", raw);
        if (!res.ok) {
          const msg = raw?.message || `Update failed: ${res.status}`;
          throw new Error(msg);
        }
        const updated = unwrapSingle<Service>(raw) || {
          ...editing,
          service_name: name.trim(),
          is_active: isActive,
          garment_id: garmentId,
        };
        setServices((prev) =>
          prev.map((p) => (p.service_id === updated.service_id ? updated : p))
        );
      } else {
        console.log(garmentId, "here is garmentId");
        const res = await fetch(SERVICE_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_name: name.trim(),
            garment_id: garmentId,
          }),
        });
        const raw = await res.json().catch(() => null);
        console.debug("POST service raw:", raw);
        if (!res.ok) {
          const msg = raw?.message || `Create failed: ${res.status}`;
          throw new Error(msg);
        }
        const created = unwrapSingle<Service>(raw);
        if (created) {
          setServices((prev) => [created, ...prev]);
        } else {
          // fallback: reload list
          await fetchServices();
        }
      }
      setModalOpen(false);
    } catch (err: any) {
      setValidationError(err?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------- delete ---------- */
  async function handleDelete(s: Service) {
    if (!confirm(`Delete service "${s.service_name}"?`)) return;
    try {
      const res = await fetch(
        `${SERVICE_BASE}/${encodeURIComponent(s.service_id)}`,
        { method: "DELETE" }
      );
      const raw = await res.json().catch(() => null);
      console.debug("DELETE service raw:", raw);
      if (!res.ok) {
        const msg = raw?.message || `Delete failed: ${res.status}`;
        throw new Error(msg);
      }
      setServices((prev) => prev.filter((p) => p.service_id !== s.service_id));
    } catch (err: any) {
      alert(err?.message || "Failed to delete");
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h2>Services</h2>
          {/* <div style={styles.subtitle}>
            Create and manage services and assign them to garments.
          </div> */}
        </div>
        <div>
          <button onClick={openCreate} style={styles.primaryBtn}>
            Add Service
          </button>
        </div>
      </header>

      {error && <div style={styles.error}>{error}</div>}

      {loadingServices ? (
        <div>Loading services...</div>
      ) : services.length === 0 ? (
        <div style={styles.empty}>No services found.</div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Garment</th>
              <th style={{ width: 160 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.service_id}>
                <td>{s.service_name}</td>
                <td>
                  {s.garment?.garment_name ??
                    garments.find((g) => g.garment_id === s.garment_id)
                      ?.garment_name ??
                    "-"}
                </td>
                {/* <td>{s.is_active ? "Yes" : "No"}</td> */}
                <td>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => openEdit(s)}
                      style={styles.secondaryBtn}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s)}
                      style={styles.dangerBtn}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        visible={modalOpen}
        title={editing ? "Edit Service" : "Add Service"}
        onClose={closeModal}
      >
        <form onSubmit={submitForm} style={{ display: "grid", gap: 8 }}>
          <label style={styles.label}>
            Name <span style={{ color: "red" }}>*</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              disabled={submitting}
            />
          </label>

          <label style={styles.label}>
            Garment <span style={{ color: "red" }}>*</span>
            <div>
              {loadingGarments ? (
                <div>Loading garments...</div>
              ) : (
                <select
                  value={garmentId}
                  onChange={(e) => setGarmentId(e.target.value)}
                  style={styles.select}
                  disabled={submitting}
                >
                  <option value="">select garment</option>
                  {garments.map((g) => (
                    <option key={g.garment_id} value={g.garment_id}>
                      {g.garment_name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </label>

          {/* <label style={styles.label}>
            Active
            <div>
              <label style={{ marginRight: 12 }}>
                <input
                  type="radio"
                  name="active"
                  checked={isActive === true}
                  onChange={() => setIsActive(true)}
                  disabled={submitting}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="active"
                  checked={isActive === false}
                  onChange={() => setIsActive(false)}
                  disabled={submitting}
                />{" "}
                No
              </label>
            </div>
          </label> */}

          {validationError && (
            <div style={styles.validationError}>{validationError}</div>
          )}

          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <button
              type="button"
              onClick={closeModal}
              style={styles.cancelBtn}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.primaryBtn}
              disabled={submitting}
            >
              {submitting ? "Saving..." : editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ---------- styles ---------- */
const styles: { [k: string]: React.CSSProperties } = {
  container: {
    maxWidth: 980,
    margin: "24px auto",
    padding: 16,
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  subtitle: { color: "#555", fontSize: 13 },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
  },
  empty: { color: "#666", padding: 24 },
  primaryBtn: {
    background: "#0b74de",
    color: "#fff",
    border: 0,
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#f3f4f6",
    color: "#111",
    border: "1px solid #e5e7eb",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  dangerBtn: {
    background: "#ffecec",
    color: "#b91c1c",
    border: "1px solid #f1a1a1",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#fff",
    color: "#111",
    border: "1px solid #e5e7eb",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    marginTop: 6,
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    marginTop: 6,
    boxSizing: "border-box",
  },
  label: { display: "block", fontSize: 14 },
  validationError: { color: "#b91c1c", marginTop: 6 },
  error: { color: "#b91c1c", marginBottom: 8 },
  /* modal */
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: 16,
  },
  modal: {
    width: 600,
    maxWidth: "100%",
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 12px 60px rgba(0,0,0,0.12)",
    overflow: "hidden",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "1px solid #eef2f6",
  },
  closeBtn: {
    background: "transparent",
    border: 0,
    fontSize: 20,
    cursor: "pointer",
    lineHeight: 1,
  },
  modalBody: { padding: 16 },
};
