import { useAppDispatch, useAppSelector } from "@/app/features/hooks";
import { fetchPosts } from "@/app/features/post/postSlice";
import PostForm from "@/components/post-form";
import ErrorComponent from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

interface EditPostPageProps {}

const EditPostPage: FC<EditPostPageProps> = ({}) => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.post.posts);
  const error = useAppSelector((state) => state.post.error);
  const post = posts.find((post) => post.id == id);
  const status = useAppSelector((state) => state.post.status);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Loading />;
  } else if (status === "error") {
    return <ErrorComponent error={error} />;
  }
  if (post) {
    return (
      <>
        <PostForm isEdit={true} post={post} />
      </>
    );
  }
};

export default EditPostPage;
