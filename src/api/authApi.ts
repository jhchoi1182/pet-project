import { instance } from "../config/axiosConfig";

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
  userLogin: (username: String, password: String) =>
    instance.post("/user/login?type=user", {
      username,
      password,
    }),
  guestLogin: () => instance.post("/user/login?type=guest"),
  withdraw: () => instance.delete("/user/delete"),
};
