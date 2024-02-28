import { atom } from "recoil";

export const paginationAtom = atom({
  key: "currentPage",
  default: 1,
});
