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
    setIsOpenLoginModal: ({ isOpenLoginModal }, { payload }) => {
      isOpenLoginModal = payload;
    },
    setIsSocialLoginInProgress: ({ isSocialLoginInProgress }, { payload }) => {
      isSocialLoginInProgress = payload;
    },
    setIsRemovedNicknameCookie: ({ isRemovedNicknameCookie }, { payload }) => {
      isRemovedNicknameCookie = payload;
    },
    setLoggedInNickname: ({ loggedInNickname }, { payload }) => {
      loggedInNickname = payload;
    },
  },
});

export const { setIsOpenLoginModal, setIsSocialLoginInProgress, setIsRemovedNicknameCookie, setLoggedInNickname } = authSlice.actions;

export default authSlice.reducer;
