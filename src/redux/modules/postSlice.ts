import { searchType } from "@/components/sidebar/molecules/SearchSort";
import { createSlice } from "@reduxjs/toolkit";

export interface PostSliceState {
  currentPage: number;
  selectedSearchType: (typeof searchType)[number];
  inputValue: string;
}

const initialState: PostSliceState = {
  currentPage: 1,
  selectedSearchType: "제목+내용",
  inputValue: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setSelectedSearchType: (state, { payload }) => {
      state.selectedSearchType = payload;
    },
    setInputValue: (state, { payload }) => {
      state.inputValue = payload;
    },
  },
});

export const { setCurrentPage, setSelectedSearchType, setInputValue } = postSlice.actions;

export default postSlice.reducer;
