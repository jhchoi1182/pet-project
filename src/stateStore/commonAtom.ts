"use client";

import { cookieUtils } from "@/util/cookieUtils";
import { atom, selector } from "recoil";

export const loginModalAtom = atom<boolean>({
  key: "loginModal",
  default: false,
});

export const loggedInNicknameAtom = atom<string | null>({
  key: "loggedInNickname",
  default: null,
});
