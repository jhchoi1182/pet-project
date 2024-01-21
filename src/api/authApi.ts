import { API_URL, instance } from "../config/axiosConfig";

export const authApi = {
  checkId: (username: String) =>
    instance.post("/user/check-username", {
      username,
    }),
  signup: (username: String, password: String, passwordConfirm: String) =>
    instance.post("/user/signup", {
      username,
      password,
      passwordConfirm,
    }),
  login: (username: String, password: String) =>
    fetch(`${API_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }),
};
