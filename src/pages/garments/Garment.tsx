import React, { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import "./Garment.css";
import {
  useGetAllGarmentsService,
  useAddGarmentService,
  useUpdateGarmentService,
  useDeleteGarmentById,
} from "../../services/Garment";
import type { GarmentType } from "@/interface/garment.interface";

const SWR_KEY = "/garment/garment";

const Garment: React.FC = () => {
  const { mutate } = useSWRConfig();

  const { data, isLoading } = useGetAllGarmentsService();
  const createMut = useAddGarmentService();
  const updateMut = useUpdateGarmentService();
  const deleteMut = useDeleteGarmentById();

  const garments: any = data?.data ?? [];

  const [garmentName, setGarmentName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- CREATE ---------------- */
  async function handleAdd(e?: React.FormEvent) {
    e?.preventDefault();
    const nameTrim = garmentName.trim();
    if (!nameTrim) {
      setError("Name is required");
      return;
    }

    setSubmitting(true);
    setError(null);

    const tempId = `temp_${Date.now()}`;

    const optimistic: GarmentType = {
      garment_id: tempId,
      garment_name: nameTrim,
    };

    // optimistic insert
    mutate(
      SWR_KEY,
      (current: any) => ({
        ...current,
        data: [optimistic, ...(current?.data ?? [])],
      }),
      false
    );

    try {
      const res = await createMut.trigger({
        body: { garment_name: nameTrim },
      });

      const created: any = res?.data;
      if (!created?.garment_id) {
        throw new Error("Invalid response from server");
      }

      // replace temp with real record
      mutate(
        SWR_KEY,
        (current: any) => ({
          ...current,
          data: [
            created,
            ...(current?.data ?? []).filter(
              (g: GarmentType) => g.garment_id !== tempId
            ),
          ],
        }),
        false
      );

      setGarmentName("");
    } catch (err: any) {
      // rollback
      await mutate(SWR_KEY);
      setError(err?.message || "Failed to create garment");
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------------- EDIT ---------------- */
  function startEdit(item: GarmentType) {
    if (item.garment_id.startsWith("temp_")) return;
    setEditingId(item.garment_id);
    setGarmentName(item.garment_name);
    setError(null);
  }

  /* ---------------- UPDATE ---------------- */
  async function handleUpdate(e?: React.FormEvent) {
    e?.preventDefault();
    if (!editingId) return;

    const nameTrim = garmentName.trim();
    if (!nameTrim) {
      setError("Name is required");
      return;
    }

    setSubmitting(true);
    setError(null);

    const optimistic: GarmentType = {
      garment_id: editingId,
      garment_name: nameTrim,
    };

    // optimistic update
    mutate(
      SWR_KEY,
      (current: any) => ({
        ...current,
        data: current.data.map((g: GarmentType) =>
          g.garment_id === editingId ? optimistic : g
        ),
      }),
      false
    );

    try {
      await updateMut.trigger({
        id: editingId,
        body: { garment_name: nameTrim },
      });

      setEditingId(null);
      setGarmentName("");
    } catch (err: any) {
      await mutate(SWR_KEY); // rollback
      setError(err?.message || "Failed to update garment");
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------------- DELETE ---------------- */
  async function handleDelete(id: string) {
    if (!confirm("Delete garment?")) return;

    const previous = data;

    // optimistic remove
    mutate(
      SWR_KEY,
      (current: any) => ({
        ...current,
        data: current.data.filter((g: GarmentType) => g.garment_id !== id),
      }),
      false
    );

    try {
      await deleteMut.trigger(id);
    } catch (err: any) {
      await mutate(SWR_KEY, previous, false);
      setError(err?.message || "Failed to delete garment");
    }
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="garments">
      <h2>Garments</h2>
      <p>Manage garment types</p>

      <form onSubmit={editingId ? handleUpdate : handleAdd}>
        <input
          value={garmentName}
          onChange={(e) => setGarmentName(e.target.value)}
          placeholder="Enter garment name"
          disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setGarmentName("");
              setError(null);
            }}
            disabled={submitting}
          >
            Cancel
          </button>
        )}
      </form>

      {error && <div className="error">{error}</div>}

      {isLoading ? (
        <div>Loading…</div>
      ) : garments.length === 0 ? (
        <div>No garments found.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Garment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {garments.map((g: any) => (
              <tr key={g.garment_id}>
                <td>{g.garment_name}</td>
                <td>
                  <button onClick={() => startEdit(g)} disabled={submitting}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(g.garment_id)}
                    disabled={submitting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Garment;
