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
