import Footer from "@/components/footer";
import { ModeToggle } from "@/components/mode-toggle";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { FC } from "react";
import { Outlet } from "react-router-dom";

interface RootLayoutProps {}

const RootLayout: FC<RootLayoutProps> = ({}) => {
  return (
    <>
      <Navbar />
      <main className=" flex justify-center items-center min-h-screen">
        <Outlet />
      </main>

      <span className=" fixed bottom-8 right-5 ">
        <ModeToggle />
      </span>
      <Toaster  />
      <Footer />
    </>
  );
};

export default RootLayout;
