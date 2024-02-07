import { useAppDispatch, useAppSelector } from "@/app/features/hooks";
import { fetchPosts } from "@/app/features/post/postSlice";
import PostCard from "@/components/postCard";
import { Loader } from "lucide-react";
import { FC, useEffect } from "react";

interface PostListProps {}

const PostList: FC<PostListProps> = ({}) => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.post.posts);
  const error = useAppSelector((state) => state.post.error);
  const status = useAppSelector((state) => state.post.status);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="  w-16 h-16 ">
        <Loader className="w-10 h-10 animate-spin " />{" "}
      </div>
    );
  } else if (status === "error") {
    return (
      <div className=" bg-destructive text-destructive-foreground p-4 h-5 w-full m-4 rounded shadow-sm shadow-secondary-foreground ">
        {error}
      </div>
    );
  } else if (status === "success") {
    return (
      <div className=" flex flex-wrap gap-3  justify-center items-center w-full mx-auto my-10 ">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    );
  }
};

export default PostList;
