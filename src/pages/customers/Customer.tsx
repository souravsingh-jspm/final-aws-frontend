import "./Customer.css";
import React, { useEffect, useState } from "react";
import {
  useGetAllCustomers,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
  Customer,
} from "@/services/Customer";

/* ---------- Modal ---------- */
const Modal: React.FC<{
  title: string;
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

const CustomerCrud: React.FC = () => {
  const { data, isLoading } = useGetAllCustomers();
  const createMut = useCreateCustomer();
  const updateMut = useUpdateCustomer();
  const deleteMut = useDeleteCustomer();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  /* ---------- Sync list ---------- */
  useEffect(() => {
    if (data?.data) {
      setCustomers(Array.isArray(data.data) ? data.data : []);
    }
  }, [data]);

  /* ---------- Modal helpers ---------- */
  const openCreate = () => {
    setEditing(null);
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setModalOpen(true);
  };

  const openEdit = (c: Customer) => {
    setEditing(c);
    setName(c.customer_name);
    setEmail(c.customer_email);
    setPhone(c.customer_phone);
    setAddress(c.customer_address ?? "");
    setModalOpen(true);
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      customer_name: name.trim(),
      customer_email: email.trim(),
      customer_phone: phone.trim(),
      customer_address: address.trim() || null,
    };

    try {
      if (editing) {
        await updateMut.trigger({
          id: editing.customer_id,
          body: payload,
        });
      } else {
        await createMut.trigger({ body: payload });
      }
      setModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- Delete ---------- */
  const handleDelete = async (c: Customer) => {
    if (!confirm(`Delete customer "${c.customer_name}"?`)) return;
    await deleteMut.trigger(c.customer_id);
  };

  return (
    <div className="customer">
      <header className="customer__header">
        <div>
          <h2 className="customer__title">Customers</h2>
          <div>Manage customers</div>
        </div>
        <button className="customer__add-btn" onClick={openCreate}>
          Add Customer
        </button>
      </header>

      {isLoading ? (
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
                      onClick={() => openEdit(c)}
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
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form className="form" onSubmit={handleSubmit}>
          <label className="form__field">
            Name *
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
            />
          </label>

          <label className="form__field">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
            />
          </label>

          <label className="form__field">
            Phone *
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={submitting}
            />
          </label>

          <label className="form__field">
            Address
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={submitting}
            />
          </label>

          <div className="form__actions">
            <button type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CustomerCrud;
