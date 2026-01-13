import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useEffect, useState } from "react";
import {
  useGetAllCustomers,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
  Customer,
} from "@/services/Customer";
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
      <div className="w-full max-w-md mx-4 bg-white rounded-xl shadow-lg">
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
  const [email] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const filteredCustomers = customers.filter((c) =>
    c.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCustomersPDF = () => {
  if (!customers.length) return;

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Customer List", 14, 15);

  autoTable(doc, {
    startY: 25,
    head: [["Name", "Phone", "Address"]],
    body: customers.map((c) => [
      c.customer_name,
      c.customer_phone,
      c.customer_address ?? "-",
    ]),
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      textColor: 255,
      fontStyle: "bold",
    },
  });

  doc.save("customers.pdf");
};


  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      setCustomers(data.data);
    }
  }, [data]);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setPhone("");
    setAddress("");
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (c: Customer) => {
    setEditing(c);
    setName(c.customer_name);
    setPhone(c.customer_phone);
    setAddress(c.customer_address ?? "");
    setFormError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    if (!name.trim() || !phone.trim()) {
      setFormError("Name and phone are required.");
      setSubmitting(false);
      return;
    }

    const payload = {
      customer_name: name.trim(),
      customer_email: email,
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
    } catch (err: any) {
      setFormError(
        err?.response?.data?.message || "Failed to save customer."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (c: Customer) => {
    if (!confirm(`Delete customer "${c.customer_name}"?`)) return;
    await deleteMut.trigger(c.customer_id);
  };

  return (
    <div className="p-6 space-y-6">
      <input
        type="text"
        placeholder="Search customer by name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setHasSearched(true);
        }}
        className="w-full sm:max-w-sm h-11 px-4 rounded-lg border border-gray-300
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Customers</h2>
          <p className="text-sm text-gray-500">Manage customers</p>
        </div>

       <div className="flex gap-2">
  <button
    onClick={downloadCustomersPDF}
    disabled={!customers.length}
    className="h-11 px-5 rounded-lg bg-gray-700 text-white text-sm font-medium
               hover:bg-gray-800 transition disabled:opacity-50"
  >
    Download PDF
  </button>

  <button
    onClick={openCreate}
    className="h-11 px-5 rounded-lg bg-blue-600 text-white text-sm font-medium
               hover:bg-blue-700 transition"
  >
    Add Customer
  </button>
</div>

      </header>

      {isLoading ? (
        <div className="py-10 text-center text-sm text-gray-500">
          Loading customers...
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500 border border-dashed rounded-lg">
          {hasSearched ? "Customer does not exist." : "No customers found."}
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-hidden border border-gray-200 rounded-xl">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Address
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((c) => (
                  <tr
                    key={c.customer_id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {c.customer_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {c.customer_phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {c.customer_address ?? "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <CustomButton
                          variant="success"
                          onClick={() => openEdit(c)}
                        >
                          Edit
                        </CustomButton>
                        <CustomButton
                          variant="danger"
                          onClick={() => handleDelete(c)}
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

          <div className="md:hidden space-y-3">
            {filteredCustomers.map((c) => (
              <div
                key={c.customer_id}
                className="border border-gray-200 rounded-lg p-4 space-y-3 bg-white"
              >
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    <strong>Name: </strong> {c.customer_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    <strong>Phone: </strong> {c.customer_phone}
                  </div>
                  <div className="text-xs text-gray-500">
                   <strong>Address: </strong> {c.customer_address ?? "-"}
                  </div>
                </div>

                <div className="flex gap-2">
                  <CustomButton
                    variant="success"
                    className="flex-1"
                    onClick={() => openEdit(c)}
                  >
                    Edit
                  </CustomButton>
                  <CustomButton
                    variant="danger"
                    className="flex-1"
                    onClick={() => handleDelete(c)}
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
        title={editing ? "Edit Customer" : "Add Customer"}
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
              className="w-full h-11 px-4 rounded-lg border border-gray-300
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone *
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={submitting}
              className="w-full h-11 px-4 rounded-lg border border-gray-300
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={submitting}
              className="w-full h-11 px-4 rounded-lg border border-gray-300
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {formError && (
            <div className="text-sm text-red-600">{formError}</div>
          )}

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
                ? "Update Customer"
                : "Create Customer"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CustomerCrud;
