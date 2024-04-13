import { cookieUtils } from "@/util/cookieUtils";
import { createSlice } from "@reduxjs/toolkit";

const { getCookie } = cookieUtils();

export interface AuthSliceState {
  isOpenLoginModal: boolean;
  isSocialLoginInProgress: boolean;
  isRemovedNicknameCookie: boolean;
  loggedInNickname: string | undefined;
  isLike: boolean;
}

const initialState: AuthSliceState = {
  isOpenLoginModal: false,
  isSocialLoginInProgress: false,
  isRemovedNicknameCookie: false,
  loggedInNickname: getCookie(),
  isLike: false,
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
    setIsLike: (state, { payload }) => {
      state.isLike = payload;
    },
  },
});

export const { setIsOpenLoginModal, setIsSocialLoginInProgress, setIsRemovedNicknameCookie, setLoggedInNickname, setIsLike } = authSlice.actions;

export default authSlice.reducer;
