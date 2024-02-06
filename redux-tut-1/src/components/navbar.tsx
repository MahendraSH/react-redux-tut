import { FC } from "react";
import { Button } from "./ui/button";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <>
      <div className="navbar  p-0 m-0 shadow shadow-muted-foreground">
        <Button variant={"navbar"}> NavIcon</Button>

        <div className=" flex  space-x-6 ml-auto  mr-5">
          <Button variant={"ghost"}> link 1</Button>
          <Button variant={"ghost"}> link 2</Button>
          <Button variant={"ghost"}> link 3</Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
