# Redux tut- 1

- counter app using react redux
- how to configure a store `configureStore`
- how to set up a `reducer` and `createSlice `
- using `useAppSelect` and `useAppDispatch`

### store configure

```js
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
```

### hooks

```js

```

### slice creation

```js
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
```

### provider

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./app/store.ts";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


```

using hooks to dispatch and select

```js

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import {
  decrement,
  decrementByValue,
  increment,
  incrementByValue,
} from "./app/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./app/features/hooks";
import Footer from "./components/footer";
import { ModeToggle } from "./components/mode-toggle";
import Navbar from "./components/navbar";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  const [num, setNum] = useState<number | null>(null);
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div className=" bg-background text-foreground">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <main className=" flex flex-col gap-4 justify-center items-center min-h-screen">
          <input
            type="text"
            value={value}
            disabled
            className=" bg-muted text-accent-foreground  m-2 p-3 px-4 rounded-md font-semibold text-lg  text-center "
          />

          <div className=" flex ">
            <input
              type="number"
              placeholder="enter a number "
              className="  m-2 p-3 px-4 rounded-md  bg-secondary text-secondary-foreground  text-lg  "
              autoFocus
              value={!num ? "enter a number " : num}
              onChange={(e) => {
                e.preventDefault();
                setNum(Number(e.target.value));
              }}
            />
          </div>
          <div className="flex justify-between items-center gap-x-5">
            <Button
              size={"lg"}
              onClick={() => {
                !num
                  ? dispatch(increment())
                  : dispatch(incrementByValue({ add: num }));
              }}
            >
              <Plus className="w-10 h-10" />{" "}
            </Button>
            <Button
              size={"lg"}
              onClick={() => {
                !num
                  ? dispatch(decrement())
                  : dispatch(decrementByValue({ sub: num }));
              }}
            >
              <Minus className=" w-10 h-10" />{" "}
            </Button>
          </div>
        </main>
        <span className=" fixed bottom-8 right-5 ">
          <ModeToggle />
        </span>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

```
