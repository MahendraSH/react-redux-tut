import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// type of reducer and that is to be dispatch

export type AppDispatch = typeof store.dispatch;
