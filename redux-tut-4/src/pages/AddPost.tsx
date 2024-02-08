import PostForm from "@/components/post-form";
import { FC } from "react";

interface AddPostProps {}

const AddPost: FC<AddPostProps> = ({}) => {
  return <PostForm isEdit={false} />;
};

export default AddPost;
