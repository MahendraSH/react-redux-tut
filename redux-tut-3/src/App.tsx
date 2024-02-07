import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import { ModeToggle } from "./components/mode-toggle";
import Navbar from "./components/navbar";
import { ThemeProvider } from "./components/theme-provider";
import AddPost from "./pages/AddPost";
import PostList from "./pages/PostList";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
    <div className=" bg-background text-foreground">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <main className=" flex justify-center items-center min-h-screen">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </main>
        <span className=" fixed bottom-8 right-5 ">
          <ModeToggle />
        </span>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
