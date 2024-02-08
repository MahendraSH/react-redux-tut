import { FC } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <>
      <div className="navbar  p-0 m-0 shadow shadow-muted-foreground">
        <Link to={"/"}>
          <Button variant={"navbar"}> NavIcon</Button>
        </Link>

        <div className=" flex  space-x-6 ml-auto  mr-5">
          <Link to={"/create"}>
            <Button variant={"ghost"}> create todo </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
