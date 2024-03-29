import { createSlice } from "@reduxjs/toolkit";

export interface PostSliceState {
  currentPage: number;
}

const initialState: PostSliceState = {
  currentPage: 1,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
});

export const { setCurrentPage } = postSlice.actions;

export default postSlice.reducer;
