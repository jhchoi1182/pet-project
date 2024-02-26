import { atom } from "recoil";

export const openCommentEditorAtom = atom<number | null>({
  key: "openCommentEditorId",
  default: null,
});
