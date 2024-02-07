import { FC } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <>
      <div className="navbar  p-0 m-0 shadow shadow-muted-foreground">
        <Link to={"/"}>
          <Button variant={"navbar"}> post </Button>
        </Link>

        <div className=" flex  space-x-6 ml-auto  mr-5">
          <Link to="/add-post">
            <Button variant={"ghost"}> add post </Button>
          </Link>
          <Link to="/users">
            <Button variant={"ghost"}> users </Button>
          </Link>

          <Button variant={"ghost"}> link 3</Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
