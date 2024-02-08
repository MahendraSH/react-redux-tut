# Redux -tut- 4

- how to update and delete the post and
- how to improve performance and usage of `memo and  useMemo( )  `

### store config

```js
import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./features/post/postSlice";
import userSlice from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    post: postSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// type of reducer and that is to be dispatch

export type AppDispatch = typeof store.dispatch;
export default store;
```

### store provider

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import store from "./app/store.ts";
import "./globals.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


```

### hooks useAppSelect and useAppDispatch

```js
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### postSlice

```js
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import axios from "axios";

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

export const CreatePost = createAsyncThunk(
  "post/create",
  async (data: { title: string; body: string; userId: string }) => {
    try {
      const res = await axios.post(POST_URL, data);
      return res.data;
    } catch (error: any) {
      if (error instanceof Error) {
        return error.message;
      } else {
        return " some  occurred at   post/create ";
      }
    }
  }
);
export const UpdatePost = createAsyncThunk(
  "post/update",
  async (data: {
    id: string;
    title: string;
    body: string;
    userId?: string;
    reaction: reactionType;
  }) => {
    try {
      const res = await axios.patch(`${POST_URL}/${data.id}`, data);
      return res.data;
    } catch (error: any) {
      if (error instanceof Error) {
        return error.message;
      } else {
        return " some  occurred at   post/update ";
      }
    }
  }
);

export const DeletePost = createAsyncThunk(
  "post/delete",
  async (data: postType) => {
    try {
      const res = await axios.delete(`${POST_URL}/${data.id}`);
      if (res.status === 200) return data;
      throw " some thing when wrong ";
      return res.data;
    } catch (error: any) {
      if (error instanceof Error) {
        return error.message;
      } else {
        return " some  occurred at   post/delete ";
      }
    }
  }
);
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
        (state, action: PayloadAction<postType[]>) => {
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
      })

      .addCase(
        CreatePost.fulfilled,
        (state, action: PayloadAction<postType>) => {
          state.status = "success";
          const post = action.payload;
          post.createdAt = new Date().toISOString();
          post.updatedAt = new Date().toISOString();
          post.reaction = {
            heart: 0,
            thumbsUp: 0,
            good: 0,
          };
          state.posts.push(post);
        }
      )
      .addCase(UpdatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdatePost.rejected, (state, acton) => {
        state.error = acton.error.message;
        state.status = "error";
        console.log(acton.error);
      })
      .addCase(
        UpdatePost.fulfilled,
        (state, action: PayloadAction<postType>) => {
          state.status = "success";
          console.log(action.payload);
          const post = action.payload;
          const posts = state.posts.filter((p) => p.id != post.id);
          state.posts = [post, ...posts];
        }
      )
      .addCase(DeletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        DeletePost.fulfilled,
        (state, action: PayloadAction<postType>) => {
          state.status = "success";
          console.log(action.payload);
          const post = action.payload;
          state.posts = state.posts.filter((p) => p.id != post.id);
        }
      )
      .addCase(DeletePost.rejected, (state, acton) => {
        state.error = acton.error.message;
        state.status = "error";
        console.log(acton.error);
      });
  },
});

export const { addPost, addReaction, deletePost, updatePost } =
  postSlice.actions;
export default postSlice.reducer;


```

### user slice

```js
import {
  PayloadAction,
  createSlice,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
const USER_URL = "https://jsonplaceholder.typicode.com/users";
interface postUserType {
  username: string;
  id: string;
}
interface postUserState {
  users: postUserType[];
  status: "error" | "loading" | "success" | "idle";
  error: string | undefined;
}

export const fetchUsers = createAsyncThunk("fetch/users", async () => {
  try {
    const res = await axios.get(USER_URL);
    return res.data;
  } catch (error: any) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return " some  error in fetch users ";
    }
  }
});

const initialState: postUserState = {
  users: [],
  status: "idle",
  error: undefined,
};

const userSlice = createSlice({
  name: "postUser",
  initialState,
  reducers: {
    addUser: {
      reducer(state, action: PayloadAction<postUserType>) {
        state.users.push(action.payload);
      },
      prepare(username: string) {
        return {
          payload: {
            id: nanoid(4),
            username: username,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })

      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<postUserType[]>) => {
          state.status = "success";
          state.users = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;


```
