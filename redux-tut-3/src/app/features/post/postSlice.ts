import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  try {
    const res = await axios.get(POST_URL);
    return res.data;
  } catch (error: any) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return " some  occurred at   post/fetchPosts ";
    }
  }
});

export interface reactionType {
  thumbsUp: number;
  heart: number;
  good: number;
}
export interface postType {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  reaction: reactionType;
}

export interface postState {
  posts: postType[];
  status: "idle" | "success" | "error" | "loading";
  error: string | undefined;
}

const initialState: postState = {
  posts: [],
  status: "idle",
  error: undefined,
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<postType>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, body: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title: title,
            body: body,
            userId: userId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            reaction: {
              thumbsUp: 0,
              heart: 0,
              good: 0,
            },
          },
        };
      },
    },
    updatePost: (state, action: PayloadAction<postType>) => {
      state.posts = state.posts.filter((post) => post.id != action.payload.id);
      state.posts.push(action.payload);
    },
    deletePost: (state, action: PayloadAction<{ id: string }>) => {
      state.posts = state.posts.filter((post) => post.id != action.payload.id);
    },

    addReaction: (
      state: typeof initialState,
      action: PayloadAction<{ _id: string; reactionKey: keyof reactionType }>
    ) => {
      const reactUpdatePost = state.posts.find(
        (post) => post.id == action.payload._id
      );
      if (reactUpdatePost)
        reactUpdatePost.reaction[action.payload.reactionKey]++;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        fetchPosts.fulfilled,
        (
          state,
          action: PayloadAction<
            {
              id: string;
              title: string;
              body: string;
              createdAt: string;
              updatedAt: string;
              userId: string;
              reaction: reactionType;
            }[]
          >
        ) => {
          state.status = "success";
          const posts = action.payload.map((post) => {
            post.reaction = {
              thumbsUp: 0,
              heart: 0,
              good: 0,
            };
            post.createdAt = new Date().toISOString();
            post.updatedAt = new Date().toISOString();

            return post;
          });
          state.posts = posts;
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { addPost, addReaction, deletePost, updatePost } =
  postSlice.actions;
export default postSlice.reducer;
