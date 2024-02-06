import { useAppSelector } from "@/app/features/hooks";
import { FC } from "react";

interface AuthorProps {
  userId: string | undefined;
}

const Author: FC<AuthorProps> = ({ userId }) => {
  const users = useAppSelector((state) => state.user.users);
  return (
    <div className=" flex justify-between items-center mt-2 ">
      <div> Author: </div>
      <div>
        {" "}
        {userId
          ? users.filter((user) => user.id === userId)[0].userName
          : "Unknown Author "}
      </div>
    </div>
  );
};

export default Author;
