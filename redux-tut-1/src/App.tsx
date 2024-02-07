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
