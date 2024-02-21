import { EnteredInfoType } from "@/components/loginSignup/organisms/SignupForm";
import { instance } from "../config/axiosConfig";

export const authApi = {
  checkUsername: (username: String) =>
    instance.post("/user/check-username", {
      username,
    }),
  checkNickname: (nickname: String) =>
    instance.post("/user/check-nickname", {
      nickname,
    }),
  signup: ({
    username,
    nickname,
    email,
    password,
    passwordConfirm,
  }: EnteredInfoType) =>
    instance.post("/user/signup", {
      username,
      nickname,
      email,
      password,
      passwordConfirm,
    }),
  login: (username: String, password: String) =>
    instance.post("/user/login", {
      username,
      password,
    }),
  withdraw: () => instance.delete("/user/delete"),
};
