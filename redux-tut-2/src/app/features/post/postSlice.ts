import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export interface reactionType {
  thumbsUp: number;
  heart: number;
  good: number;
}
export interface postType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  reaction: reactionType;
}

export interface postState {
  posts: postType[];
}

const initialState: postState = {
  posts: [
    {
      id: nanoid(4),
      title: "title-1",
      content:
        "some content  -1 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui maxime sint quia itaque quam accusantium repudiandae doloremque similique repellendus a praesentium, reiciendis vero commodi eligendi voluptatum ipsam vel iusto modi.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reaction: {
        thumbsUp: 0,
        heart: 0,
        good: 0,
      },
    },
    {
      id: nanoid(4),
      title: "title-2",
      content:
        "some content  -2  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui maxime sint quia itaque quam accusantium repudiandae doloremque similique repellendus a praesentium, reiciendis vero commodi eligendi voluptatum ipsam vel iusto modi. ",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reaction: {
        thumbsUp: 0,
        heart: 0,
        good: 0,
      },
    },
  ],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<postType>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title: title,
            content: content,
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
});

export const { addPost , addReaction , deletePost , updatePost } = postSlice.actions;
export default postSlice.reducer;
