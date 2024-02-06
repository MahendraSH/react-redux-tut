import { useAppDispatch, useAppSelector } from "@/app/features/hooks";
import { addPost } from "@/app/features/post/postSlice";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { FC, useState } from "react";

interface AddPostProps {}

const AddPost: FC<AddPostProps> = ({}) => {
  const users = useAppSelector((state) => state.user.users);

  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const canSave = title && content && userId;
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSave) {
      dispatch(addPost(title, content, userId));
    } else {
      setError("both title and content are required  and must be string ");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
    setTitle("");
    setContent("");
    setUserId("");
  };

  return (
    <div className="">
      <div className="uppercase text-2xl font-semibold text-wrap  p-4 m-2  text-center  flex justify-between items-center ">
        Post add from <PlusCircleIcon className="  w-10 h-10 " />
      </div>
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className=" flex  flex-col items-center  min-w-96 p-5 bg-secondary/50  text-accent-foreground rounded-md  shadow-sm shadow-secondary-foreground     "
      >
        <label className=" capitalize flex justify-between items-center text-base  gap-x-3 p-2 w-full ">
          <p className="w-2/5">post title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              e.preventDefault();
              setTitle(e.target.value);
            }}
            autoFocus
            className=" w-3/5 p-3 px-4 m-2 text-lg bg-muted/70 text-accent-foreground rounded-md min-w-40  "
          />
        </label>
        <label className=" capitalize flex justify-between items-center text-base  gap-x-3 p-2  w-full">
          <p className="w-2/5">post author </p>
          <select
            className=" w-3/5 p-3 px-4 m-2 text-lg bg-muted/70 text-accent-foreground rounded-md min-w-40  "
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          >
            <option value=""></option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.userName}
              </option>
            ))}
          </select>
        </label>
        <label className=" capitalize flex justify-between items-center text-base  gap-x-3 p-2  w-full">
          <p className="w-2/5">post content</p>
          <input
            type="text"
            value={content}
            onChange={(e) => {
              e.preventDefault();
              setContent(e.target.value);
            }}
            className=" w-3/5 p-3 px-4 m-2 text-lg bg-muted/70 text-accent-foreground rounded-md  min-w-40 "
          />
        </label>
        {error && (
          <div className=" bg-destructive p-4 m-3 rounded-md w-96 ">
            {error}
          </div>
        )}

        <Button
          size={"lg"}
          type="submit"
          className=" min-w-44  mt-3  px-4"
          disabled={!canSave}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddPost;
