import { useAppDispatch, useAppSelector } from "@/app/features/hooks";
import { fetchPosts } from "@/app/features/post/postSlice";
import { fetchUsers } from "@/app/features/user/userSlice";
import PostCard from "@/components/postCard";
import ErrorComponent from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { FC, useEffect, useMemo } from "react";

interface PostListProps {}

const PostList: FC<PostListProps> = ({}) => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.post.posts);
  const error = useAppSelector((state) => state.post.error);
  const status = useAppSelector((state) => state.post.status);
  const userStatus = useAppSelector((state) => state.user.status);
  useMemo(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch, userStatus]);

  if (status === "loading") {
    return <Loading />;
  } else if (status === "error") {
    return <ErrorComponent error={error} />;
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
