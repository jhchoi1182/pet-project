import { API_URL, instance } from "./config/config";

export const authApi = {
  checkId: (username: String) =>
    instance.post("/user/check-username", {
      username,
    }),
  signup: (username: String, password: String, passwordConfirm: String) =>
    fetch(`${API_URL}/user/signup`, {
      method: "POST",
      body: JSON.stringify({ username, password, passwordConfirm }),
      headers: {
        "Content-Type": "application/json",
      },
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
