import "./ServiceForm.css"
import React, { useState, FormEvent } from "react";

// local types just for the form
export type ServiceStatus = "Active" | "Inactive";

export interface ServiceFormValues {
  name: string;
  description: string;
  status: ServiceStatus;
}

interface ServiceFormProps {
  mode: "create" | "edit";
  initialValues?: ServiceFormValues;
  onSubmit: (values: ServiceFormValues) => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  mode,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );
  const [status, setStatus] = useState<ServiceStatus>(
    initialValues?.status ?? "Active"
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, status });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{mode === "create" ? "Add Service" : "Edit Service"}</h2>

        <form onSubmit={handleSubmit} className="service-form">
          <div className="form-field">
            <label htmlFor="service-name">Service Name</label>
            <input
              id="service-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="service-description">Description</label>
            <textarea
              id="service-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="service-status">Status</label>
            <select
              id="service-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ServiceStatus)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {mode === "create" ? "Save" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
