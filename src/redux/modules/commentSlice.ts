import { Comment } from "@/types/model/comment";
import { createSlice } from "@reduxjs/toolkit";

export interface CommentSliceState {
  comments: Comment[];
  openCommentEditor: number | null;
}

const initialState: CommentSliceState = {
  comments: [],
  openCommentEditor: null,
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setOpenCommentEditor: ({ openCommentEditor }, { payload }) => {
      openCommentEditor = payload;
    },
    setComments: ({ comments }, { payload }) => {
      comments = payload;
    },
  },
});

export const { setOpenCommentEditor, setComments } = commentSlice.actions;

export default commentSlice.reducer;
