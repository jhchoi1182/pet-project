import { Comment } from "@/types/model/comment";
import { atom } from "recoil";

export const openCommentEditorAtom = atom<number | null>({
  key: "openCommentEditorId",
  default: null,
});

export const commentsAtom = atom<Comment[]>({
  key: "commentsAtom",
  default: [],
});
