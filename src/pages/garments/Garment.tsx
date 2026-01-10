import React, { useState } from "react";
import { useSWRConfig } from "swr";
import "./Garment.css";
import {
  useGetAllGarmentsService,
  useAddGarmentService,
  useUpdateGarmentService,
  useDeleteGarmentById,
} from "../../services/Garment";
import type { GarmentType } from "@/interface/garment.interface";
import CustomButton from "@/components/buttons/CustomButton";
import TextInput from "@/components/input/Input";

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
      await mutate(SWR_KEY); 
      setError(err?.message || "Failed to update garment");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete garment?")) return;

    const previous = data;

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

  return (
    <div className="garments">
      <div >
      <h2 className="garment-heading">Garments</h2>
      <p className="garment-paragraph">Manage garment types</p>
        <form
          className="garment-form bg-gray-50 border border-gray-200 rounded-xl p-6"
          onSubmit={editingId ? handleUpdate : handleAdd}
        >
          <div className="flex flex-col gap-4">
            <TextInput
              label="Garment Name"
              value={garmentName}
              onChange={(e) => setGarmentName(e.target.value)}
              placeholder="Enter garment name"
              disabled={submitting}
              required
              helperText="Example: Shirt, Sweater, Saree"
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting || !garmentName.trim()}
                className="px-5 h-11 rounded-lg bg-blue-600 text-white text-sm font-medium
                          hover:bg-blue-700 transition
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingId ? "Update Garment" : "Add Garment"}
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
                  className="px-4 h-11 rounded-lg text-sm font-medium text-gray-600
                            hover:bg-gray-200 transition
                            disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {error && <div className="error">{error}</div>}

 <div className="mt-6">
  {isLoading ? (
    <div className="flex items-center justify-center py-10 text-sm text-gray-500">
      Loading garments…
    </div>
  ) : garments.length === 0 ? (
    <div className="flex items-center justify-center py-10 text-sm text-gray-500 border border-dashed rounded-lg">
      No garments found. Add one to get started.
    </div>
  ) : (
    <div className="overflow-hidden border border-gray-200 rounded-xl">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Garment
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {garments.map((g: any) => (
            <tr
              key={g.garment_id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 text-sm text-gray-800">
                {g.garment_name}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <CustomButton
                    variant="success"
                    onClick={() => startEdit(g)}
                    disabled={submitting}
                  >
                    Edit
                  </CustomButton>

                  <CustomButton
                    variant="danger"
                    onClick={() => handleDelete(g.garment_id)}
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
  )}
</div>

    </div>
  );
};

export default Garment;
