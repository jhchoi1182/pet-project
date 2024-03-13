import { atom } from "recoil";

export const loginModalAtom = atom<boolean>({
  key: "loginModal",
  default: false,
});

export const loggedInNicknameAtom = atom<string | undefined>({
  key: "loggedInNickname",
  default: undefined,
});

export const isSocialLoginInProgressAtom = atom({
  key: "isSocialLoginInProgress",
  default: false,
});

export const isRemovedNicknameCookieAtom = atom({
  key: "isRemovedNicknameCookieAtom",
  default: false,
});
