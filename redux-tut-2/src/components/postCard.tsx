import { postType } from "@/app/features/post/postSlice";
import { FC } from "react";
import Author from "./author";
import ReactionsCard from "./reactionsCard";

interface PostCardProps {
  post: postType;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <div className=" flex flex-col justify-start items-center w-96 aspect-[7/5] p-4 m-3 rounded-md bg-secondary/40 text-accent-foreground shadow-sm  shadow-secondary-foreground ">
      <h3 className="font-semibold text-2xl ">{post.title} </h3>
      <h4 className="font-semibold text-lg ">{post.id} </h4>
      <p className=" min-h-30  p-2  ">
        {post.content.length > 240
          ? post.content.slice(0, 240) + "  more....."
          : post.content}{" "}
      </p>
      <Author userId={post.userId} />
      <div className=" flex justify-between items-center mt-2 ">
        <div> createdAt : </div>
        <div> {post.createdAt}</div>
      </div>

      <div className=" flex justify-between items-center mt-2 ">
        <div> updatedAt : </div>
        <div> {post.updatedAt}</div>
      </div>

      <div className=" flex justify-between w-full p-2 mt-2 m-1 rounded ">
        <ReactionsCard  reaction={post.reaction} id= {post.id} />
      </div>
    </div>
  );
};

export default PostCard;
