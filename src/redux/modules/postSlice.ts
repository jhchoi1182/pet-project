import { SortCategoryType } from "@/components/sidebar/atom/CategorySelect";
import { SearchType } from "@/components/sidebar/molecules/SearchSort";
import { createSlice } from "@reduxjs/toolkit";

export interface PostSliceState {
  currentPage: number;
  selectedCategory: SortCategoryType;
  selectedSearchType: SearchType;
  inputValue: string;
}

const initialState: PostSliceState = {
  currentPage: 1,
  selectedCategory: "전체",
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
    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
    setSelectedSearchType: (state, { payload }) => {
      state.selectedSearchType = payload;
    },
    setInputValue: (state, { payload }) => {
      state.inputValue = payload;
    },
  },
});

export const { setCurrentPage, setSelectedCategory, setSelectedSearchType, setInputValue } = postSlice.actions;

export default postSlice.reducer;
