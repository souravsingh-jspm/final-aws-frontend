// src/components/Garment.tsx
import React, { useEffect, useReducer, useState } from "react";
import { useSWRConfig } from "swr";

import {
  useGetAllGarmentsService,
  // useAddGarmentService,
  useUpdateGarmentService,
  useDeleteGarmentById,
} from "../../services/Garment";
import type { GarmentType } from "@/interface/garment.interface";

const SWR_KEY = "/garment/garment";

type State = {
  items: GarmentType[];
  loading: boolean;
  error?: string | null;
};

type Action =
  | { type: "Fetch"; payload: GarmentType[] }
  | { type: "Add"; payload: GarmentType }
  | { type: "Remove"; payload: { id: string } }
  | { type: "Update"; payload: GarmentType }
  | { type: "SetError"; payload?: string | null }
  | { type: "SetLoading"; payload: boolean };

/* ----------------- Reducer ----------------- */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "Fetch":
      return { ...state, items: action.payload, loading: false, error: null };
    case "Add":
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false,
        error: null,
      };
    case "Remove":
      return {
        ...state,
        items: state.items.filter((it) => it.garment_id !== action.payload.id),
        loading: false,
        error: null,
      };
    case "Update":
      return {
        ...state,
        items: state.items.map((it) =>
          it.garment_id === action.payload.garment_id ? action.payload : it
        ),
        loading: false,
        error: null,
      };
    case "SetError":
      return { ...state, error: action.payload ?? null, loading: false };
    case "SetLoading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

const Garment: React.FC = () => {
  const { mutate } = useSWRConfig();

  const listSwr = useGetAllGarmentsService();
  // const createMut = useAddGarmentService();
  const updateMut = useUpdateGarmentService();
  const deleteMut = useDeleteGarmentById();

  const [state, dispatch] = useReducer(reducer, {
    items: [],
    loading: true,
    error: null,
  });
  const [garmentName, setGarmentName] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (listSwr.data && listSwr.data.data) {
      const items = listSwr.data.data as GarmentType[];
      dispatch({ type: "Fetch", payload: items });
    } else if (!listSwr.isValidating && !listSwr.data) {
      // no data and not loading
      dispatch({ type: "Fetch", payload: [] });
    }
  }, [listSwr.data, listSwr.isValidating]);

  const garments = state.items;

  async function handleAdd(e?: React.FormEvent) {
    e?.preventDefault();
    const nameTrim = garmentName?.trim();
    if (!nameTrim) {
      dispatch({ type: "SetError", payload: "Name is required." });
      return;
    }
    setSubmitting(true);
    dispatch({ type: "SetLoading", payload: true });

    // optimistic placeholder
    const tempId = `temp_${Date.now()}`;
    const placeholder: GarmentType = {
      garment_id: tempId,
      garment_name: nameTrim,
    } as GarmentType;

    // optimistic update to both reducer and SWR cache
    dispatch({ type: "Add", payload: placeholder });
    mutate(
      SWR_KEY,
      (current: any) => {
        const currentData = current?.data ?? [];
        return { ...current, data: [placeholder, ...currentData] };
      },
      false // do not revalidate yet
    );

    try {
      // const res = await createMut.trigger({ body: { garment_name: nameTrim } });
      await mutate(SWR_KEY);
      setGarmentName("");
      setEditingId(null);
    } catch (err: any) {
      await mutate(SWR_KEY);
      dispatch({
        type: "SetError",
        payload: err?.message ?? "Failed to create garment",
      });
    } finally {
      setSubmitting(false);
      dispatch({ type: "SetLoading", payload: false });
    }
  }

  /* Edit initiation */
  function startEdit(item: GarmentType) {
    setEditingId(item.garment_id);
    setGarmentName(item.garment_name);
    dispatch({ type: "SetError", payload: null });
  }

  /* Update handler */
  async function handleUpdate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!editingId) return;
    const nameTrim = garmentName?.trim();
    if (!nameTrim) {
      dispatch({ type: "SetError", payload: "Name is required." });
      return;
    }

    setSubmitting(true);
    dispatch({ type: "SetLoading", payload: true });

    // optimistic update locally and in SWR cache
    const updated: GarmentType = {
      garment_id: editingId,
      garment_name: nameTrim,
    } as GarmentType;
    dispatch({ type: "Update", payload: updated });
    mutate(
      SWR_KEY,
      (current: any) => {
        const currentData = current?.data ?? [];
        return {
          ...current,
          data: currentData.map((it: GarmentType) =>
            it.garment_id === updated.garment_id ? updated : it
          ),
        };
      },
      false
    );

    try {
      await updateMut.trigger({
        id: editingId,
        body: { garment_name: nameTrim },
      });
      await mutate(SWR_KEY);
      setGarmentName("");
      setEditingId(null);
    } catch (err: any) {
      await mutate(SWR_KEY);
      dispatch({
        type: "SetError",
        payload: err?.message ?? "Failed to update garment",
      });
    } finally {
      setSubmitting(false);
      dispatch({ type: "SetLoading", payload: false });
    }
  }

  /* Delete handler */
  async function handleDelete(id: string) {
    if (!confirm("Delete garment?")) return;

    // optimistic remove
    const previous = listSwr.data;
    dispatch({ type: "Remove", payload: { id } });
    mutate(
      SWR_KEY,
      (current: any) => {
        const currentData = current?.data ?? [];
        return {
          ...current,
          data: currentData.filter((it: GarmentType) => it.garment_id !== id),
        };
      },
      false
    );

    try {
      await deleteMut.trigger(id);
      await mutate(SWR_KEY);
    } catch (err: any) {
      await mutate(SWR_KEY, previous, false);
      dispatch({
        type: "SetError",
        payload: err?.message ?? "Failed to delete",
      });
    }
  }

  return (
    <div style={{ maxWidth: 880, margin: "24px auto", padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div>
          <h2>Garments</h2>
          <div style={{ color: "#555", fontSize: 13 }}>
            Manage garment types
          </div>
        </div>
      </div>

      <form
        onSubmit={editingId ? handleUpdate : handleAdd}
        style={{
          marginBottom: 16,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <input
          value={garmentName}
          onChange={(e) => setGarmentName(e.target.value)}
          placeholder="Enter garment name"
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            minWidth: 300,
          }}
          disabled={submitting}
        />
        <button
          type="submit"
          style={{ padding: "8px 12px", borderRadius: 6 }}
          disabled={submitting}
        >
          {editingId
            ? submitting
              ? "Updating..."
              : "Update"
            : submitting
            ? "Saving..."
            : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setGarmentName("");
              dispatch({ type: "SetError", payload: null });
            }}
            style={{ padding: "8px 12px", borderRadius: 6 }}
            disabled={submitting}
          >
            Cancel
          </button>
        )}
      </form>

      {state.error && (
        <div style={{ color: "#b91c1c", marginBottom: 8 }}>{state.error}</div>
      )}

      <div>
        {listSwr.isValidating && garments.length === 0 ? (
          <div>Loading...</div>
        ) : garments.length === 0 ? (
          <div style={{ color: "#666" }}>No garments found.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Garment</th>
                <th style={{ width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {garments.map((g) => (
                <tr key={g.garment_id}>
                  <td style={{ padding: "8px 6px" }}>{g.garment_name}</td>
                  <td style={{ padding: "8px 6px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => startEdit(g)}
                        style={{ padding: "6px 10px", borderRadius: 6 }}
                        disabled={submitting}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(g.garment_id)}
                        style={{ padding: "6px 10px", borderRadius: 6 }}
                        disabled={submitting}
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
      </div>
    </div>
  );
};

export default Garment;
