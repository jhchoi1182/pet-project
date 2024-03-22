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
    setOpenCommentEditor: (state, action) => {
      state.openCommentEditor = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { setOpenCommentEditor, setComments } = commentSlice.actions;

export default commentSlice.reducer;
