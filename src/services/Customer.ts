// src/services/customerService.ts
import { ApiResponse, getApi, postApi, putApi, deleteApi } from "@/utils/api";
import useSwr from "swr";
import useSWRMutation from "swr/mutation";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

/* ---------- Types ---------- */
export interface Customer {
  customer_seq: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address?: string | null;
}

export interface CustomersData {
  data: Customer[];
}

/* ---------- Base ---------- */
const CUSTOMER_BASE = "/customer/customer";

/* ---------- Toast helpers ---------- */
const onError = (err: AxiosError<ApiResponse<any> | any>) => {
  toast.error(
    err?.response?.data?.message ?? err?.message ?? "Something went wrong"
  );
};

const onSuccess = (res: ApiResponse<any>) => {
  if (res?.message) toast.success(res.message);
};

/* ---------- Fetch all customers ---------- */
export const useGetAllCustomers = () => {
  return useSwr(CUSTOMER_BASE, () =>
    getApi<CustomersData, null>(CUSTOMER_BASE, null)
  );
};

/* ---------- Create customer ---------- */
export const useCreateCustomer = () => {
  return useSWRMutation(
    CUSTOMER_BASE,
    (
      url,
      {
        arg,
      }: {
        arg: {
          body: {
            customer_name: string;
            customer_email: string;
            customer_phone: string;
            customer_address?: string | null;
          };
        };
      }
    ) => postApi<Customer, any>(url, arg.body),
    { onSuccess, onError }
  );
};

/* ---------- Update customer ---------- */
export const useUpdateCustomer = () => {
  return useSWRMutation(
    CUSTOMER_BASE,
    (
      url,
      {
        arg,
      }: {
        arg: {
          id: string;
          body: {
            customer_name: string;
            customer_email: string;
            customer_phone: string;
            customer_address?: string | null;
          };
        };
      }
    ) => putApi<Customer, any>(`${url}/${arg.id}`, arg.body),
    { onSuccess, onError }
  );
};

/* ---------- Delete customer ---------- */
export const useDeleteCustomer = () => {
  return useSWRMutation(
    CUSTOMER_BASE,
    (url, { arg }: { arg: string }) => deleteApi<unknown>(`${url}/${arg}`),
    { onSuccess, onError }
  );
};
