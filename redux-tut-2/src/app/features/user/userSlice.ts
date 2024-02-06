import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import postSlice from "../post/postSlice";

interface postUserType {
  userName: string;
  id: string;
}
interface postUserState {
  users: postUserType[];
}

const initialState: postUserState = {
  users: [
    { id: nanoid(4), userName: "name-1" },
    { id: nanoid(4), userName: "name-2" },
  ],
};

const userSlice = createSlice({
  name: "postUser",
  initialState,
  reducers: {
    addUser: {
      reducer(state, action: PayloadAction<postUserType>) {
        state.users.push(action.payload);
      },
      prepare(userName: string) {
        return {
          payload: {
            id: nanoid(4),
            userName: userName,
          },
        };
      },
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
