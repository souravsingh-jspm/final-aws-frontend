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

/* ---------- Modal ---------- */
const Modal: React.FC<{
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ visible, title, onClose, children }) => {
  if (!visible) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <header>
          <h3>{title}</h3>
          <button onClick={onClose}>×</button>
        </header>
        <div>{children}</div>
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
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) setServices(data.data);
  }, [data]);

  useEffect(() => {
    if (garmentData?.data && Array.isArray(garmentData.data)) {
      setGarments(garmentData.data);
    }
  }, [garmentData]);

  /* ---------- Modal helpers ---------- */
  const openCreate = () => {
    setEditing(null);
    setName("");
    setGarmentId("");
    setIsActive(true);
    setModalOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setName(s.service_name);
    setGarmentId(s.garment_id);
    setIsActive(Boolean(s.is_active));
    setModalOpen(true);
  };

  /* ---------- Submit ---------- */
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      service_name: name.trim(),
      garment_id: garmentId,
      is_active: isActive,
    };

    try {
      if (editing) {
        await updateMut.trigger({ id: editing.service_id, body: payload });
      } else {
        await createMut.trigger({ body: payload });
      }
      setModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- Delete ---------- */
  const handleDelete = async (s: Service) => {
    if (!confirm(`Delete service "${s.service_name}"?`)) return;
    await deleteMut.trigger(s.service_id);
  };

  return (
    <div className="services">
      <header>
        <h2>Services</h2>
        <button onClick={openCreate}>Add Service</button>
      </header>

      {services.length === 0 ? (
        <div>No services found.</div>
      ) : (
        <table>
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
                  {s.garment?.garment_name ??
                    garments.find((g) => g.garment_id === s.garment_id)
                      ?.garment_name ??
                    "-"}
                </td>
                <td>
                  <button onClick={() => openEdit(s)}>Edit</button>
                  <button onClick={() => handleDelete(s)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        visible={modalOpen}
        title={editing ? "Edit Service" : "Add Service"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={submitForm}>
          <label>Service Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
          />

          <label>Garment</label>
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

          <label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active
          </label>

          <div>
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
