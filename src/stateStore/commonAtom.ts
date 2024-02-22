"use client";

import { cookieUtils } from "@/util/cookieUtils";
import { atom, selector } from "recoil";

export const loginModalAtom = atom<boolean>({
  key: "loginModal",
  default: false,
});

export const usernameAtom = atom<string | null>({
  key: "username",
  default: null,
});
