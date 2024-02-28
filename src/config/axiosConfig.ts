import axios from "axios";
import { studySyncServerURL } from "./envConfig";

export const instance = axios.create({
  baseURL: studySyncServerURL,
  withCredentials: true,
});
