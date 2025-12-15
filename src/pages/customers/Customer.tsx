// src/components/CustomerCrud.tsx
import React, { JSX, useEffect, useState } from "react";

/**
 * Matches your Prisma Customer model:
 * customer_id, customer_name, customer_email, customer_phone, customer_addr
 */
type Customer = {
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address?: string | null;
  customer_createdAt?: string;
  customer_updatedAt?: string;
};

const BASE = "http://15.206.204.80:3000/customer/customer";

/* ---------- helpers for unwrapping API wrapper ---------- */
function unwrapArray<T>(raw: any): T[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  if (raw && Array.isArray(raw.customers)) return raw.customers;
  if (
    raw &&
    raw.data &&
    typeof raw.data === "object" &&
    !Array.isArray(raw.data)
  ) {
    // sometimes POST/PUT returns single item in data
    return [raw.data];
  }
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
  if (raw && typeof raw === "object" && ("customer_id" in raw || "id" in raw))
    return raw as T;
  return null;
}

/* ---------- Simple Modal ---------- */
const Modal: React.FC<{
  title?: string;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, visible, onClose, children }) => {
  if (!visible) return null;
  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <strong>{title || "Modal"}</strong>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
            ×
          </button>
        </div>
        <div style={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default function CustomerCrud(): JSX.Element {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // modal / form state
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);

  // form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchList() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BASE, { method: "GET" });
      const raw = await res.json().catch(() => null);
      console.debug("GET raw:", raw);
      const list = unwrapArray<Customer>(raw);
      setCustomers(list);
    } catch (err: any) {
      setError(err.message || "Failed to fetch customers");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditing(null);
    setName("");
    setEmail("");
    setPhone("");
    setAddr("");
    setValidationError(null);
    setModalOpen(true);
  }

  function openEditModal(c: Customer) {
    setEditing(c);
    setName(c.customer_name ?? "");
    setEmail(c.customer_email ?? "");
    setPhone(c.customer_phone ?? "");
    setAddr(c.customer_address ?? "");
    setValidationError(null);
    setModalOpen(true);
  }

  function closeModal() {
    if (isSubmitting) return;
    setModalOpen(false);
  }

  function validateForm() {
    if (!name.trim()) return "Name is required.";
    if (!email.trim()) return "Email is required.";
    // basic email regex (not exhaustive)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) return "Invalid email address.";
    if (!phone.trim()) return "Phone is required.";
    if (phone.length > 50) return "Phone is too long.";
    if (addr && addr.length > 300) return "Address is too long.";
    return null;
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setValidationError(null);
    const v = validateForm();
    if (v) {
      setValidationError(v);
      return;
    }

    setSubmitting(true);
    try {
      if (editing) {
        // Update
        const res = await fetch(
          `${BASE}/${encodeURIComponent(editing.customer_id)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customer_name: name.trim(),
              customer_email: email.trim(),
              customer_phone: phone.trim(),
              customer_addr: addr.trim() || null,
            }),
          }
        );

        const raw = await res.json().catch(() => null);
        console.debug("PUT raw:", raw);

        if (!res.ok) {
          // attempt to show server message
          const msg =
            raw?.message ||
            raw?.data?.message ||
            `Update failed: ${res.status}`;
          throw new Error(msg);
        }

        const updated = unwrapSingle<Customer>(raw) || {
          customer_id: editing.customer_id,
          customer_name: name.trim(),
          customer_email: email.trim(),
          customer_phone: phone.trim(),
          customer_addr: addr.trim() || null,
        };

        setCustomers((prev) =>
          prev.map((p) => (p.customer_id === updated.customer_id ? updated : p))
        );
      } else {
        // Create
        const res = await fetch(BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_name: name.trim(),
            customer_email: email.trim(),
            customer_phone: phone.trim(),
            customer_addr: addr.trim() || null,
          }),
        });

        const raw = await res.json().catch(() => null);
        console.debug("POST raw:", raw);

        if (!res.ok) {
          const msg =
            raw?.message ||
            raw?.data?.message ||
            `Create failed: ${res.status}`;
          throw new Error(msg);
        }

        const created = unwrapSingle<Customer>(raw);
        if (created) {
          setCustomers((prev) => [created, ...prev]);
        } else {
          // fallback: refetch list
          await fetchList();
        }
      }
      setModalOpen(false);
    } catch (err: any) {
      // show server error or validation error
      setValidationError(err.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(c: Customer) {
    const ok = window.confirm(`Delete customer "${c.customer_name}"?`);
    if (!ok) return;
    try {
      const res = await fetch(`${BASE}/${encodeURIComponent(c.customer_id)}`, {
        method: "DELETE",
      });
      const raw = await res.json().catch(() => null);
      console.debug("DELETE raw:", raw);

      if (!res.ok) {
        const msg =
          raw?.message || raw?.data?.message || `Delete failed: ${res.status}`;
        throw new Error(msg);
      }

      setCustomers((prev) =>
        prev.filter((p) => p.customer_id !== c.customer_id)
      );
    } catch (err: any) {
      alert(err.message || "Failed to delete");
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h2>Customers</h2>
        </div>
        <div>
          <button onClick={openCreateModal} style={styles.primaryBtn}>
            Add Customer
          </button>
        </div>
      </header>

      {error && <div style={styles.error}>{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : customers.length === 0 ? (
        <div style={styles.empty}>No customers found.</div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Email</th>
              <th style={{ textAlign: "left" }}>Phone</th>
              <th style={{ textAlign: "left" }}>Address</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.customer_id}>
                <td>{c.customer_name}</td>
                <td>{c.customer_email}</td>
                <td>{c.customer_phone}</td>
                <td>{c.customer_address ?? "-"}</td>
                <td>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => openEditModal(c)}
                      style={styles.secondaryBtn}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c)}
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
        title={editing ? "Edit Customer" : "Add Customer"}
        visible={isModalOpen}
        onClose={closeModal}
      >
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
          <label style={styles.label}>
            Name <span style={{ color: "red" }}>*</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              disabled={isSubmitting}
            />
          </label>

          <label style={styles.label}>
            Email <span style={{ color: "red" }}>*</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              disabled={isSubmitting}
            />
          </label>

          <label style={styles.label}>
            Phone <span style={{ color: "red" }}>*</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
              disabled={isSubmitting}
            />
          </label>

          <label style={styles.label}>
            Address
            <input
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              style={styles.input}
              disabled={isSubmitting}
            />
          </label>

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
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.primaryBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ---------- minimal inline styles ---------- */
const styles: { [k: string]: React.CSSProperties } = {
  container: {
    maxWidth: 960,
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
  subtitle: {
    color: "#555",
    fontSize: 13,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
  },
  empty: {
    color: "#666",
    padding: 24,
  },
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
  label: {
    display: "block",
    fontSize: 14,
  },
  validationError: {
    color: "#b91c1c",
    marginTop: 6,
  },
  error: {
    color: "#b91c1c",
    marginBottom: 8,
  },
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
    width: 560,
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
  modalBody: {
    padding: 16,
  },
};
