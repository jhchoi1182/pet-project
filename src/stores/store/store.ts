import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "../modules/commentSlice";
import authSlice from "../modules/authSlice";
import postSlice from "../modules/postSlice";

export const store = configureStore({
  reducer: {
    commentSlice,
    authSlice,
    postSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
