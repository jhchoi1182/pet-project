import { cookieUtils } from "@/utils/cookieUtils";
import axios from "axios";

const { getCookie, removeCookie } = cookieUtils();

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${getCookie()}`;
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const { response } = error;
    if (response.data.resultCode === "INVALID_TOKEN") {
      alert("권한이 없습니다.");
      removeCookie();
      window.location.href = "/login";
    } else if (response.status === 500) {
      alert("서버 연결에 실패했습니다.");
      console.error(response.data.resultCode);
    } else return Promise.reject(error);
  },
);
