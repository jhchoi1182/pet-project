import { cookieUtils } from "@/utils/cookieUtils";
import axios from "axios";

export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://next-todo-mu.vercel.app/";
  return base_url;
};

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL

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
    // TODO: 인증 예외처리 로직
    return Promise.reject(error);
  },
);
