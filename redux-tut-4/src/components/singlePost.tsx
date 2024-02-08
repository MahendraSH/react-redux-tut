import { DeletePost, postType } from "@/app/features/post/postSlice";
import { FC } from "react";
import Author from "./author";
import ReactionsCard from "./reactionsCard";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Edit, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/app/features/hooks";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface SinglePostProps {
  post: postType | undefined;
}

const SinglePost: FC<SinglePostProps> = ({ post }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!post?.body) {
    return " not found";
  }
  return (
    <div className=" flex flex-col justify-start items-center min-h-96   md:max-w-screen-md  xl:max-w-screen-lg  md:aspect-square    w-full text-lg  p-2  md:p-4 md:m-3 rounded-md bg-secondary/40 text-accent-foreground shadow-sm  shadow-secondary-foreground ">
      <h3 className="font-semibold text-3xl ">{post.title} </h3>
      <Separator className=" my-4 " />
      <div className=" bg-muted rounded m-1 p-3 text-muted-foreground w-full   flex justify-between ">
        <Author userId={post.userId} />

        <div className=" flex justify-center items-center gap-x-4">
          <Link to={`/post/edit/${post.id}`}>
            <Button size={"icon"}>
              <Edit className=" w-5 h-5 " />
            </Button>
          </Link>

          <Button
            size={"icon"}
            variant={"destructive"}
            onClick={() => {
              dispatch(DeletePost(post));

              toast({
                title: "Delete Successful ",
                duration: 2000,
              });

              navigate("/");
            }}
          >
            <Trash2Icon className=" w-5 h-5 " />
          </Button>
        </div>
      </div>
      <Separator className=" my-2 " />

      <p className=" min-h-30  p-2  text-lg ">{post.body}</p>
      <Separator className=" my-2 " />
      <div className=" flex justify-between items-center  gap-3 mt-auto  ">
        <div> createdAt : </div>
        <div> {post.createdAt}</div>
      </div>

      <div className=" flex justify-between items-center mt-2 gap-3 ">
        <div> updatedAt : </div>
        <div> {post.updatedAt}</div>
      </div>

      <div className=" flex justify-between w-full p-2  m-1 rounded mt-3  gap-3">
        <ReactionsCard reaction={post.reaction} id={post.id} />
      </div>
    </div>
  );
};

export default SinglePost;
