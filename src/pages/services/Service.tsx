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
import CustomButton from "@/components/buttons/CustomButton";

const Modal: React.FC<{
  title: string;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
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

  /* -------------------- Effects -------------------- */
  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      setServices(data.data);
    }
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Services</h2>
          <p className="text-sm text-gray-500">Manage services</p>
        </div>

        <button
          onClick={openCreate}
          className="h-11 px-5 rounded-lg bg-blue-600 text-white text-sm font-medium
                     hover:bg-blue-700 transition"
        >
          Add Service
        </button>
      </header>

      {/* Table */}
    {/* Services List */}
{services.length === 0 ? (
  <div className="py-10 text-center text-sm text-gray-500 border border-dashed rounded-lg">
    No services found.
  </div>
) : (
  <>
    {/* Desktop Table */}
    <div className="hidden md:block overflow-hidden border border-gray-200 rounded-xl">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
              Garment
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {services.map((s) => (
            <tr
              key={s.service_id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4  text-sm text-gray-800">
                {s.service_name}
              </td>

              <td className="px-6 py-4 text-center text-sm text-gray-600">
                {garments.find((g) => g.garment_id === s.garment_id)
                  ?.garment_name ?? "-"}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <CustomButton
                    variant="success"
                    onClick={() => openEdit(s)}
                  >
                    Edit
                  </CustomButton>
                  <CustomButton
                    variant="danger"
                    onClick={() => handleDelete(s)}
                  >
                    Delete
                  </CustomButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards */}
    <div className="md:hidden space-y-3">
      {services.map((s) => (
        <div
          key={s.service_id}
          className="border border-gray-200 rounded-lg p-4 space-y-3 bg-white"
        >
          <div>
            <div className="text-sm font-semibold text-gray-800">
              {s.service_name}
            </div>
            <div className="text-xs text-gray-500">
              Garment:{" "}
              {garments.find((g) => g.garment_id === s.garment_id)
                ?.garment_name ?? "-"}
            </div>
          </div>

          <div className="flex gap-2">
            <CustomButton
              variant="success"
              className="flex-1"
              onClick={() => openEdit(s)}
            >
              Edit
            </CustomButton>

            <CustomButton
              variant="danger"
              className="flex-1"
              onClick={() => handleDelete(s)}
            >
              Delete
            </CustomButton>
          </div>
        </div>
      ))}
    </div>
  </>
)}


      <Modal
        title={editing ? "Edit Service" : "Add Service"}
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={submitForm} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Service Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-300
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         disabled:bg-gray-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Garment
            </label>
            <select
              value={garmentId}
              onChange={(e) => setGarmentId(e.target.value)}
              disabled={submitting}
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-300
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         disabled:bg-gray-100"
            >
              <option value="">Select garment</option>
              {garments.map((g) => (
                <option key={g.garment_id} value={g.garment_id}>
                  {g.garment_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="h-11 px-4 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="h-11 px-5 rounded-lg bg-blue-600 text-white text-sm font-medium
                         hover:bg-blue-700 transition disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : editing
                ? "Update Service"
                : "Create Service"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServiceCrud;
