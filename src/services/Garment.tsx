// src/services/garmentService.ts
import { ApiResponse, deleteApi, getApi, postApi, putApi } from "@/utils/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useSwr from "swr";
import useSWRMutation from "swr/mutation";

/* ---------- Types (adjust to exact backend shape if needed) ---------- */
export interface Garment {
  garment_id: string;
  garment_name: string;
}

export interface GarmentsData {
  data: Garment[];
  link?: any;
  count?: number;
}

const ADMIN_BASE = `/garment/garment`; // relative to your API base in utils/api

/* ---------- Toast helpers ---------- */
const onError = (err: AxiosError<ApiResponse<null> | any>) => {
  if (err?.response?.data?.message) {
    toast.error(err.response.data.message);
  } else {
    toast.error(err?.message ?? "Something went wrong");
  }
};

const onSuccess = (res: ApiResponse<any>) => {
  if (res?.message) toast.success(res.message);
};

/* ---------- List (no params) ---------- */
export const useGetAllGarmentsService = () => {
  return useSwr([ADMIN_BASE], async ([url]: [string]) => {
    try {
      return await getApi<GarmentsData, null>(url, null);
    } catch (error) {
      // swallow and return empty consistent shape (helps consumers)
      return { data: [], link: undefined, count: 0 } as GarmentsData;
    }
  });
};

// export const useGetAllGarment = () => {
//   return useSwr([ADMIN_BASE], ([url]: [string]) => {
//     return getApi<GarmentsData[], null>(url, null);
//   });
// }; easy manner
/* ---------- Create (mutation) ---------- */
export const useAddGarmentService = () => {
  return useSWRMutation(
    ADMIN_BASE,
    (url: string, { arg }: { arg: { body: { garment_name: string } } }) => {
      return postApi<object, { garment_name: string }>(url, arg.body);
    },
    {
      onSuccess,
      onError,
    }
  );
};

/* ---------- Get by id ---------- */
export const useGetGarmentById = (id: string) => {
  return useSwr([`${ADMIN_BASE}/${id}`], ([url]: [string]) => {
    return getApi<Garment, null>(url, null);
  });
};

/* ---------- Update (mutation) ---------- */
export const useUpdateGarmentService = () => {
  return useSWRMutation(
    ADMIN_BASE + `/`, // we will append id when calling trigger
    (
      url: string,
      { arg }: { arg: { id: string; body: { garment_name: string } } }
    ) => {
      return putApi<object, { garment_name: string }>(url + arg.id, arg.body);
    },
    {
      onSuccess,
      onError,
    }
  );
};

/* ---------- Delete (mutation) ---------- */
export const useDeleteGarmentById = () => {
  return useSWRMutation(
    ADMIN_BASE + `/`, // append id when calling trigger
    (url: string, { arg }: { arg: string }) => {
      return deleteApi<unknown>(url + arg);
    },
    {
      onSuccess,
      onError,
    }
  );
};
