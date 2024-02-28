import axios from "axios";
import { isDevelopment, serverURL } from "./envConfig";

export const instance = axios.create({
  baseURL: isDevelopment ? "https://localhost:8443/api" : serverURL,
  withCredentials: true,
});
