import { useAppSelector } from "@/app/features/hooks";
import { Loader } from "lucide-react";
import { FC } from "react";

interface AuthorProps {
  userId: string | undefined;
}

const Author: FC<AuthorProps> = ({ userId }) => {

  const users = useAppSelector((sate) => sate.user.users);
  const status = useAppSelector((state) => state.user.status);
  const error = useAppSelector((state) => state.user.error);

  if (status === "loading") {
    return (
      <div className="  w-16 h-16 ">
        <Loader className="w-10 h-10 animate-spin " />{" "}
      </div>
    );
  } else if (status === "error") {
    return (
      <div className=" w-full min-h-20 p-4 m-4 rounded shadow-sm shadow-secondary-foreground bg-destructive text-destructive-foreground">
        {error}
      </div>
    );
  } else if (status === "success") {
    return (
      <div className=" flex justify-between items-center mt-2 gap-3 ">
        <div> Author: </div>
        <div>
          {userId
            ? users.filter((user) => user.id === userId)[0]?.username
            : "Unknown Author "}
        </div>
      </div>
    );
  }
};

export default Author;
