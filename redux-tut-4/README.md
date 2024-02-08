# Redux - tut -3

### using `CreateAsyncThunk`

### post slice

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

### using this userSlice

```js
import { useAppDispatch, useAppSelector } from "@/app/features/hooks";
import { addUser, fetchUsers } from "@/app/features/user/userSlice";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface UsersPageProps {}

const UsersPage: FC<UsersPageProps> = ({}) => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((sate) => sate.user.users);
  const status = useAppSelector((state) => state.user.status);
  const error = useAppSelector((state) => state.user.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const [username, setUsername] = useState < string > "";
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      dispatch(addUser(username));
    }
    setUsername("");
  };

  if (status === "loading") {
    return (
      <div className="  w-16 h-16 ">
        <Loader className="w-10 h-10 animate-spin " />{" "}
      </div>
    );
  } else if (status === "error") {
    return (
      <div className=" w-full min-h-20 p-4 m-4 rounded shadow-sm shadow-secondary-foreground bg-destructive text-destructive-foreground">
        {error}
      </div>
    );
  }
  return (
    <div className=" flex flex-col justify-center items-center  md:w-full  max-w-screen-sm box-border">
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className=" flex flex-col justify-center items-center  md:min-h-96 p-4 mx-2 my-10 bg-secondary/40 rounded text-accent-foreground w-full shadow-sm shadow-secondary-foreground "
      >
        <div className=" text-2xl font-semibold uppercase  p-2 m-3 text-center ">
          add user
        </div>

        <label className=" capitalize flex justify-between items-center text-base  gap-x-3 p-2 w-full ">
          <p className="w-2/5">post title</p>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
            className=" w-3/5 p-3 px-4 m-2 text-lg bg-muted/70 text-accent-foreground rounded-md min-w-52 "
          />
        </label>

        <Button
          size={"lg"}
          type="submit"
          className=" min-w-44  mt-3  px-4"
          disabled={!username}
        >
          Submit
        </Button>
      </form>
      <div className="  flex flex-col min-w-full max-w-screen-sm  w-full md:min-h-96 p-4 mx-2 my-10 bg-secondary/40 rounded text-accent-foreground   shadow-sm  shadow-secondary-foreground  flex-wrap gap-3   ">
        <div className=" flex text-2xl  justify-center uppercase  w-full items-center font-semibold p-4 m-2 ">
          Users
        </div>
        {users.map((user) => (
          <div
            className=" flex  justify-between  min-w-full  max-w-screen-sm md:w-full items-center text-lg font-semibold px-2 py-4 md:p-4 m-2 rounded-md shadow shadow-muted-foreground  "
            key={user.id}
          >
            <div>{user.id} :</div>
            <div>{user.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
```
