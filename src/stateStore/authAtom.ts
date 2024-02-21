import { atom } from "recoil";

export const nameDuplicationAtom = atom({
  key: "nameDuplication",
  default: {
    isUsernameAvailable: false,
    isNicknameAvailable: false,
  },
});
