import TodoList from "@/pages/TodoList";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import CreateTodo from "./pages/CreateTodo";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<TodoList />} />
        <Route path="/create" element={<CreateTodo />} />
      </Route>
    </Routes>
  );
}
