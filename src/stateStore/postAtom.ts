import { Post } from "@/types/model/post";
import { atom } from "recoil";

export const paginationAtom = atom({
  key: "currentPage",
  default: 1,
});

export const postAtom = atom<Post>({
  key: "post",
  default: {
    postId: 0,
    title: "",
    contents: "",
    nickname: "",
    commentsCount: 0,
    createdAt: "",
  },
});
