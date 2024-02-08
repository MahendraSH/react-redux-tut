import Footer from "@/components/footer";
import { ModeToggle } from "@/components/mode-toggle";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { FC } from "react";
import { Outlet } from "react-router-dom";

interface RootLayoutProps {}

const RootLayout: FC<RootLayoutProps> = ({}) => {
  return (
    <div className=" bg-background text-foreground">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <main className="   mt-10 min-h-screen">
          <Outlet />
        </main>
        <span className=" fixed bottom-8 right-5 ">
          <ModeToggle />
        </span>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default RootLayout;
