import "./Service.css";
import React, { useEffect, useState } from "react";
import {
  useGetAllServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
  Service,
  Garment,
} from "@/services/Service";
import { useGetAllGarmentsService } from "@/services/Garment";

/* ---------- Modal (SAME AS CUSTOMER) ---------- */
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

const ServiceCrud: React.FC = () => {
  const { data } = useGetAllServices();
  const { data: garmentData } = useGetAllGarmentsService();

  const createMut = useCreateService();
  const updateMut = useUpdateService();
  const deleteMut = useDeleteService();

  const [services, setServices] = useState<Service[]>([]);
  const [garments, setGarments] = useState<Garment[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [name, setName] = useState("");
  const [garmentId, setGarmentId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) setServices(data.data);
  }, [data]);

  useEffect(() => {
    if (garmentData?.data && Array.isArray(garmentData.data)) {
      setGarments(garmentData.data);
    }
  }, [garmentData]);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setGarmentId("");
    setModalOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setName(s.service_name);
    setGarmentId(s.garment_id);
    setModalOpen(true);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      service_name: name.trim(),
      garment_id: garmentId,
    };

    try {
      if (editing) {
        await updateMut.trigger({
          id: editing.service_id,
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

  const handleDelete = async (s: Service) => {
    if (!confirm(`Delete service "${s.service_name}"?`)) return;
    await deleteMut.trigger(s.service_id);
  };

  return (
    <div className="services">
      <header className="services__header">
        <div>
          <h2 className="services__title">Services</h2>
          <div>Manage services</div>
        </div>
        <button className="services__add-btn" onClick={openCreate}>
          Add Service
        </button>
      </header>

      {services.length === 0 ? (
        <div>No services found.</div>
      ) : (
        <table className="services__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Garment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.service_id}>
                <td>{s.service_name}</td>
                <td>
                  {garments.find((g) => g.garment_id === s.garment_id)
                    ?.garment_name ?? "-"}
                </td>
                <td>
                  <div className="services__actions">
                    <button onClick={() => openEdit(s)}>Edit</button>
                    <button onClick={() => handleDelete(s)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        title={editing ? "Edit Service" : "Add Service"}
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form className="form" onSubmit={submitForm}>
          <label className="form__field">
            Service Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
            />
          </label>

          <label className="form__field">
            Garment
            <select
              value={garmentId}
              onChange={(e) => setGarmentId(e.target.value)}
              disabled={submitting}
            >
              <option value="">Select garment</option>
              {garments.map((g) => (
                <option key={g.garment_id} value={g.garment_id}>
                  {g.garment_name}
                </option>
              ))}
            </select>
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

export default ServiceCrud;
