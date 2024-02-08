import { useAppDispatch, useAppSelector } from "@/app/features/hooks";
import { fetchPosts } from "@/app/features/post/postSlice";
import SinglePost from "@/components/singlePost";
import ErrorComponent from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";

interface PostIdPageProps {}

const PostIdPage: FC<PostIdPageProps> = ({}) => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.post.posts);
  const error = useAppSelector((state) => state.post.error);
  const post = posts.find((post) => post.id == id);
  const status = useAppSelector((state) => state.post.status);
  useMemo(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Loading />;
  } else if (status === "error") {
    return <ErrorComponent error={error} />;
  }
  return (
    <div>
      <SinglePost post={post} />
    </div>
  );
};

export default PostIdPage;
