import { ApiResponse, getApi, postApi, putApi, deleteApi } from "@/utils/api";
import useSwr from "swr";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface Garment {
  garment_id: string;
  garment_name: string;
}

export interface Service {
  service_id: string;
  service_name: string;
  garment_id: string;
  is_active: boolean;
  garment?: Garment | null;
}

export interface ServicesData {
  data: Service[];
}

const SERVICE_BASE = "/service/service";

/* ---------- Toast helpers ---------- */
const onError = (err: AxiosError<ApiResponse<any> | any>) => {
  toast.error(
    err?.response?.data?.message ?? err?.message ?? "Something went wrong"
  );
};

const onSuccess = (res: ApiResponse<any>) => {
  if (res?.message) toast.success(res.message);
};

export const useGetAllServices = () => {
  return useSwr(SERVICE_BASE, () =>
    getApi<ServicesData, null>(SERVICE_BASE, null)
  );
};

/* ---------- Create service ---------- */
export const useCreateService = () => {
  return useSWRMutation(
    SERVICE_BASE,
    (
      url,
      {
        arg,
      }: {
        arg: {
          body: {
            service_name: string;
            garment_id: string;
            is_active?: boolean;
          };
        };
      }
    ) => postApi<Service, any>(url, arg.body),
    { onSuccess, onError }
  );
};

/* ---------- Update service ---------- */
export const useUpdateService = () => {
  return useSWRMutation(
    SERVICE_BASE,
    (
      url,
      {
        arg,
      }: {
        arg: {
          id: string;
          body: {
            service_name: string;
            garment_id: string;
            is_active: boolean;
          };
        };
      }
    ) => putApi<Service, any>(`${url}/${arg.id}`, arg.body),
    { onSuccess, onError }
  );
};

/* ---------- Delete service ---------- */
export const useDeleteService = () => {
  return useSWRMutation(
    SERVICE_BASE,
    (url, { arg }: { arg: string }) => deleteApi<unknown>(`${url}/${arg}`),
    { onSuccess, onError }
  );
};
