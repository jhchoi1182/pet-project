import axios from "axios";
import { isDevelopment, serverURL } from "./envConfig";

export const instance = axios.create({
  baseURL: isDevelopment ? "http://localhost:8080/api" : serverURL,
  withCredentials: true,
});