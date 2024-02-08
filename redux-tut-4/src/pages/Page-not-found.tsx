import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FC } from "react";

interface PageNotFoundProps {}

const PageNotFound: FC<PageNotFoundProps> = ({}) => {
  return (
    <div className=" capitalize flex justify-center items-center min-h-screen">
      <Button
        variant={"secondary"}
        size={"lg"}
        className="   text-pretty font-sans"
      >
        <Loader2 className=" w-10 h-10 animate-spin mr-4 " />
        Page Not Found
      </Button>
    </div>
  );
};

export default PageNotFound;
