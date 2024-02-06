import { useAppDispatch, useAppSelector } from "@/app/features/hooks";
import { addUser } from "@/app/features/user/userSlice";
import { Button } from "@/components/ui/button";
import { FC, useState } from "react";

interface UsersPageProps {}

const UsersPage: FC<UsersPageProps> = ({}) => {
  const users = useAppSelector((sate) => sate.user.users);
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState<string>("");
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName) {
      dispatch(addUser(userName));
    }
    setUserName("");
  };
  return (
    <div className=" flex flex-col justify-center items-center  md:w-full  max-w-screen-sm box-border">
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className=" flex flex-col justify-center items-center  md:min-h-96 p-4 mx-2 my-10 bg-secondary/40 rounded text-accent-foreground w-full shadow-sm shadow-secondary-foreground "
      >
        <div className=" text-2xl font-semibold uppercase  p-2 m-3 text-center ">
          add user
        </div>

        <label className=" capitalize flex justify-between items-center text-base  gap-x-3 p-2 w-full ">
          <p className="w-2/5">post title</p>
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              e.preventDefault();
              setUserName(e.target.value);
            }}
            className=" w-3/5 p-3 px-4 m-2 text-lg bg-muted/70 text-accent-foreground rounded-md min-w-52 "
          />
        </label>

        <Button
          size={"lg"}
          type="submit"
          className=" min-w-44  mt-3  px-4"
          disabled={!userName}
        >
          Submit
        </Button>
      </form>
      <div className="  flex flex-col min-w-full max-w-screen-sm  w-full md:min-h-96 p-4 mx-2 my-10 bg-secondary/40 rounded text-accent-foreground   shadow-sm  shadow-secondary-foreground  flex-wrap gap-3   ">
        <div className=" flex text-2xl  justify-center uppercase  w-full items-center font-semibold p-4 m-2 ">
          Users
        </div>
        {users.map((user) => (
          <div
            className=" flex  justify-between  min-w-full  max-w-screen-sm md:w-full items-center text-lg font-semibold px-2 py-4 md:p-4 m-2 rounded-md shadow shadow-muted-foreground  "
            key={user.id}
          >
            <div>{user.id} :</div>
            <div>{user.userName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
