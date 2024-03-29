import { Post } from "@/types/model/post";
import { createSlice } from "@reduxjs/toolkit";

export interface PostSliceState {
  currentPage: number;
  post: Post;
}

const initialState: PostSliceState = {
  currentPage: 1,
  post: {
    postId: 0,
    title: "",
    contents: "",
    images: [],
    nickname: "",
    commentsCount: 0,
    createdAt: "",
    updatedAt: "",
  },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setPost: (state, { payload }) => {
      state.post = payload;
    },
    optimisticUpdatePost: (state, { payload }) => {
      const { title, contents } = payload;
      state.post = { ...state.post, title, contents };
    },
  },
});

export const { setCurrentPage, setPost, optimisticUpdatePost } = postSlice.actions;

export default postSlice.reducer;
