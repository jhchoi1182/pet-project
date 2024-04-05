import { UnionOfCategoryAtSearch, UnionOfSearchType } from "@/types/request/post";
import { createSlice } from "@reduxjs/toolkit";

export interface PostSliceState {
  currentPage: number;
  selectedCategory: UnionOfCategoryAtSearch;
  selectedSearchType: UnionOfSearchType;
  inputValue: string;
  searchValue: string;
}

const initialState: PostSliceState = {
  currentPage: 1,
  selectedCategory: "전체",
  selectedSearchType: "제목+내용",
  inputValue: "",
  searchValue: "",
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
    setSearchValue: (state, { payload }) => {
      state.searchValue = payload;
    },
  },
});

export const { setCurrentPage, setSelectedCategory, setSelectedSearchType, setInputValue, setSearchValue } = postSlice.actions;

export default postSlice.reducer;
