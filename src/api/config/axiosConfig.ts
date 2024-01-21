import { ErrorResponse } from "@/types/response/errorResponse";
import { cookieUtils } from "@/utils/cookieUtils";
import axios from "axios";

export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://next-todo-mu.vercel.app/";
  return base_url;
};

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const { getCookie } = cookieUtils();

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = getCookie();
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const { status } = (error as ErrorResponse).response;
    if (status === 500) {
      alert("서버 연결에 실패했습니다.");
    } else return Promise.reject(error);
  },
);
