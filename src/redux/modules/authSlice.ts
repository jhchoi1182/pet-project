import { createSlice } from "@reduxjs/toolkit";

export interface AuthSliceState {
  isOpenLoginModal: boolean;
  isSocialLoginInProgress: boolean;
  isRemovedNicknameCookie: boolean;
  loggedInNickname: string | undefined;
}

const initialState: AuthSliceState = {
  isOpenLoginModal: false,
  isSocialLoginInProgress: false,
  isRemovedNicknameCookie: false,
  loggedInNickname: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsOpenLoginModal: (state, { payload }) => {
      state.isOpenLoginModal = payload;
    },
    setIsSocialLoginInProgress: (state, { payload }) => {
      state.isSocialLoginInProgress = payload;
    },
    setIsRemovedNicknameCookie: (state, { payload }) => {
      state.isRemovedNicknameCookie = payload;
    },
    setLoggedInNickname: (state, { payload }) => {
      state.loggedInNickname = payload;
    },
  },
});

export const { setIsOpenLoginModal, setIsSocialLoginInProgress, setIsRemovedNicknameCookie, setLoggedInNickname } = authSlice.actions;

export default authSlice.reducer;
