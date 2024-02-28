import { cookieUtils } from "@/util/cookieUtils";
import { atom } from "recoil";

export const loginModalAtom = atom<boolean>({
  key: "loginModal",
  default: false,
});

export const loggedInNicknameAtom = atom<string | undefined>({
  key: "loggedInNickname",
  default: undefined,
});

export const isLoginAtom = atom<string | undefined>({
  key: "isLogin",
  default: undefined,
});
