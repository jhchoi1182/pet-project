import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "../modules/commentSlice";
import authSlice from "../modules/authSlice";

export const store = configureStore({
  reducer: {
    commentSlice,
    authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
