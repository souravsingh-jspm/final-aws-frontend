import "./Customer.css";
import React, { JSX, useEffect, useState } from "react";
type Customer = {
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address?: string | null;
  customer_createdAt?: string;
  customer_updatedAt?: string;
};

const BASE = "http://13.49.222.163:3000/customer/customer";

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

const Modal: React.FC<{
  title?: string;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, visible, onClose, children }) => {
  if (!visible) return null;
  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <div className="modal__header">
          <strong>{title}</strong>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function CustomerCrud(): JSX.Element {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    fetchList();
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
          await fetchList();
        }
      }
      setModalOpen(false);
    } catch (err: any) {
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
    <div className="customer">
      <header className="customer__header">
        <div>
          <h2 className="customer__title">Customers</h2>
          <div>Manage serivces types</div>
        </div>

        <button className="customer__add-btn" onClick={openCreateModal}>
          Add Customer
        </button>
      </header>

      {error && <div className="customer__error">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : customers.length === 0 ? (
        <div>No customers found.</div>
      ) : (
        <table className="customer__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
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
                  <div className="customer__actions">
                    <button
                      className="customer__action-btn customer__action-btn--edit"
                      onClick={() => openEditModal(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="customer__action-btn customer__action-btn--delete"
                      onClick={() => handleDelete(c)}
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
        <form className="form" onSubmit={handleSubmit}>
          <label className="form__field">
            <span className="form__label">Name *</span>
            <input
              className="form__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </label>

          <label className="form__field">
            <span className="form__label">Email *</span>
            <input
              className="form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </label>

          <label className="form__field">
            <span className="form__label">Phone *</span>
            <input
              className="form__input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
            />
          </label>

          <label className="form__field">
            Address
            <input
              className="form__input"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              disabled={isSubmitting}
            />
          </label>

          {validationError && (
            <div className="form__error">{validationError}</div>
          )}
          <div className="form__actions">
            <button type="button" onClick={closeModal} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
