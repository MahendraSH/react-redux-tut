import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface counterState {
  value: number;
}

const initialState: counterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value = state.value + 1;
    },
    incrementByValue: (state, action: PayloadAction<{ add: number }>) => {
      state.value = state.value + action.payload.add;
    },
    decrement: (state) => {
      state.value = state.value - 1;
    },
    decrementByValue: (state, action: PayloadAction<{ sub: number }>) => {
      state.value = state.value - action.payload.sub;
    },
  },
});

export const { increment, decrement, incrementByValue, decrementByValue } =
  counterSlice.actions;

export default counterSlice.reducer;
