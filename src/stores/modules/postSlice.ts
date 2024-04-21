import { UnionOfCategoryAtSearch, UnionOfSearchType } from "@/types/type/post";
import { createSlice } from "@reduxjs/toolkit";

export interface PostSliceState {
  currentPage: number;
  selectedCategory: UnionOfCategoryAtSearch;
  selectedSearchType: UnionOfSearchType;
  inputValue: string;
  searchValue: string;
  postLikes: number;
}

const initialState: PostSliceState = {
  currentPage: 1,
  selectedCategory: "전체",
  selectedSearchType: "제목+내용",
  inputValue: "",
  searchValue: "",
  postLikes: 0,
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
    setPostLikes: (state, { payload }) => {
      state.postLikes = payload;
    },
  },
});

export const { setCurrentPage, setSelectedCategory, setSelectedSearchType, setInputValue, setSearchValue, setPostLikes } = postSlice.actions;

export default postSlice.reducer;
