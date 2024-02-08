import { useAppDispatch, useAppSelector } from "@/app/features/hooks";
import {
  CreatePost,
  UpdatePost,
  postType,
} from "@/app/features/post/postSlice";
import { useToast } from "@/components/ui/use-toast";
import { EditIcon, PlusCircleIcon } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface props1 {
  isEdit: true;
  post: postType;
}

interface props2 {
  isEdit: false;
  post: null;
}

const PostForm: FC<props1 | props2> = ({ isEdit, post }) => {
  const { toast } = useToast();
  const users = useAppSelector((state) => state.user.users);
  const error = useAppSelector((state) => state.post.error);
  const status = useAppSelector((state) => state.post.status);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(post?.title || "");
  const [content, setContent] = useState<string>(post?.body || "");
  const [userId, setUserId] = useState<string>(post?.userId || "");

  const canSave = title && content && userId;

  const formTitle = isEdit ? "Edit Post " : "Create Post";
  const toastTitle = !isEdit
    ? "Post Created Successfully"
    : "Post Edited Successfully";
  const formButtonValue = isEdit ? " Update" : "Create";
  const Icon = !isEdit ? PlusCircleIcon : EditIcon;
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSave && !isEdit) {
      dispatch(CreatePost({ title, body: content, userId }));

      setTitle("");
      setContent("");
      setUserId("");
    }
    if (canSave && isEdit) {
      dispatch(
        UpdatePost({
          title,
          body: content,
          userId,
          id: post.id,
          reaction: post?.reaction,
        })
      );
    }

    if (status === "error") {
      toast({
        title: error,
        duration: 2000,
      });
    }

    toast({
      title: toastTitle,
      duration: 2000,
    });

    
      navigate(`/`);
  };

  return (
    <div className="">
      <div className="uppercase text-2xl font-semibold text-wrap  p-4 m-2  text-center  flex justify-between items-center ">
        {formTitle}
        <Icon className="  w-10 h-10 " />
      </div>
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className=" flex  flex-col items-center  min-h-96 p-5 bg-secondary/50  text-accent-foreground rounded-md  shadow-sm shadow-secondary-foreground     "
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
        <label className=" capitalize flex justify-between items-center title: string, error: string | undefined, { ...props }: Toastr: string | undefined, { ...props }: Toastp-2  w-full">
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
                {user.username}
              </option>
            ))}
          </select>
        </label>
        <label className=" capitalize flex justify-between items-center text-base  gap-x-3 p-2  w-full">
          <p className="w-2/5">post content</p>
          <textarea
            rows={10}
            cols={30}
            value={content}
            onChange={(e) => {
              e.preventDefault();
              setContent(e.target.value);
            }}
            className=" w-3/5 p-3 px-4 m-2 text-lg bg-muted/70 text-accent-foreground rounded-md  min-w-40 "
          />
        </label>

        <Button
          size={"lg"}
          type="submit"
          className=" min-w-44  mt-3  px-4"
          disabled={!canSave}
        >
          {formButtonValue}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
