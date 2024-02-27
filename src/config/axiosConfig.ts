import axios from "axios";
import { isDevelopment, serverURL } from "./envConfig";

export const instance = axios.create({
  baseURL: isDevelopment ? "http://localhost:8080/api" : serverURL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const { response } = error;
    if (response?.data?.resultCode === "INVALID_TOKEN") {
      alert("권한이 없습니다.");
      return Promise.reject(error);
    } else if (response?.status === 500) {
      alert("서버 연결에 실패했습니다.");
      console.error(response.data.resultCode);
    } else return Promise.reject(error);
  },
);
