import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import RootLayout from "./layout/RootLayout";
import AddPost from "./pages/AddPost";
import PageNotFound from "./pages/Page-not-found";
import PostIdPage from "./pages/PostIdPage";
import PostList from "./pages/PostList";
import UsersPage from "./pages/UsersPage";
import EditPostPage from "./pages/EditPostPage";

export default function App() {
  return (
    <div className=" bg-background text-foreground">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<PostList />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/post/:id" element={<PostIdPage />} />
            <Route path="/post/edit/:id" element={<EditPostPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}
