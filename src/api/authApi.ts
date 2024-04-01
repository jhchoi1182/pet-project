import { EnteredInfoType } from "@/components/loginSignup/organisms/SignupForm";
import { instance } from "../config/axiosConfig";
import axios from "axios";

export const authApi = {
  checkUsername: (username: String) =>
    instance.post("/user/check-username", {
      username,
    }),
  checkNickname: (nickname: String) =>
    instance.post("/user/check-nickname", {
      nickname,
    }),
  signup: ({ username, nickname, email, password, passwordConfirm }: EnteredInfoType) =>
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
  googleLogin: (code: string) => {
    return instance.post("/user/google", { code });
  },
  githubLogin: (code: string | null) => {
    return instance.post("/user/github", { code });
  },
  kakaoLogin: (code: string | null) => {
    return instance.post("/user/kakao", { code });
  },
  getUserInfo: async () => {
    const { data } = await instance.get("/user");
    return data?.result;
  },
  setCookies: async (token: string) => {
    const { data } = await axios.post(`http://localhost:3000/api/setCookies`, { token });
    return data?.result;
  },
  logout: () => instance.post("/user/logout"),
  withdraw: () => instance.delete("/user/delete"),
};
