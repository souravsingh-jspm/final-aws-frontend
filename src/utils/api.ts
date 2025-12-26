// import { API_URL } from "@/constant/appConstant";
import axios, { type AxiosResponse } from "axios";
// export const API_URL = "https://api.shivaliwashingcompany.in/";

export const API_URL = "http://localhost:3001/";
export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface Link {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  next: string;
  prev: string;
}

export interface CommonPaginationType<T> {
  data: T;
  link: Link;
  count: number;
}

// const token =
//   localStorage.getItem("token") &&
//   JSON.parse(localStorage.getItem("token") ?? "");

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApi = async <Response, Params>(url: string, params: Params) => {
  const response: AxiosResponse<ApiResponse<Response>> =
    await axiosInstance.get(url, { params });
  return response.data;
};

export const postApi = async <Response, Body>(url: string, body: Body) => {
  const response: AxiosResponse<ApiResponse<Response>> =
    await axiosInstance.post(url, body);
  return response.data;
};

export const putApi = async <Response, Body>(url: string, body: Body) => {
  const response: AxiosResponse<ApiResponse<Response>> =
    await axiosInstance.put(url, body);
  return response.data;
};

export const deleteApi = async <Response>(url: string) => {
  const response: AxiosResponse<ApiResponse<Response>> =
    await axiosInstance.delete(url);
  return response.data;
};
