import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./features/post/postSlice";
import userSlice from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    post: postSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// type of reducer and that is to be dispatch

export type AppDispatch = typeof store.dispatch;
export default store;
