import { useAppSelector } from "@/app/features/hooks";
import PostCard from "@/components/postCard";
import { FC } from "react";

interface PostListProps {}

const PostList: FC<PostListProps> = ({}) => {
  const posts = useAppSelector((state) => state.post.posts);
  return (
    <div className=" flex flex-wrap gap-3  justify-center items-center w-full mx-auto my-10 ">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      
    </div>
  );
};

export default PostList;
