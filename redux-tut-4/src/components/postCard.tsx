import { postType } from "@/app/features/post/postSlice";
import { MoveRight } from "lucide-react";
import { FC } from "react";
import ReactionsCard from "./reactionsCard";
import { Button } from "./ui/button";
import Author from "./author";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: postType;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <div className=" flex flex-col justify-start items-center min-h-96 md:h-96  md:aspect-[7/6] p-4 m-3 rounded-md bg-secondary/40 text-accent-foreground shadow-sm  shadow-secondary-foreground ">
      <h3 className="font-semibold text-2xl ">{post.title} </h3>
      <h4 className="font-semibold text-lg ">{post.id} </h4>
      <p className=" min-h-30  p-2  ">
        {post.body.length > 240 ? (
          <>
            {post.body.slice(0, 240)}
            <Link to={`/post/${post.id}`}>
              <Button variant={"link"} className="underline">
                more ...
              </Button>
            </Link>
          </>
        ) : (
          <>
            {post.body}
            <Link to={`/post/${post.id}`}>
              <Button variant={"link"} className=" underline">
                See more <MoveRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </>
        )}
      </p>
      <Author userId={post.userId} />
      <div className=" flex justify-between items-center mt-auto ">
        <div> createdAt : </div>
        <div> {post.createdAt}</div>
      </div>

      <div className=" flex justify-between items-center">
        <div> updatedAt : </div>
        <div> {post.updatedAt}</div>
      </div>

      <div className=" flex justify-between w-full p-2 mt-1 m-1 rounded ">
        <ReactionsCard reaction={post.reaction} id={post.id} />
      </div>
    </div>
  );
};

export default PostCard;
