import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TodoType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const apiSlice = createApi({
  reducerPath: "todoAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),

  tagTypes: ["TODO"],
  endpoints: (builder) => ({
    getTodos: builder.query<TodoType[], {}>({
      query: () => "todos/",
      providesTags: ["TODO"],
    }),
    getTodoById: builder.query<TodoType, number>({
      query: (id) => `todos/${id}/`,
      providesTags: ["TODO"],
    }),
    createTodo: builder.mutation<TodoType, { title: string }>({
      query: ({ title }) => ({
        url: `todos/`,
        method: "POST",
        body: title,
      }),
      invalidatesTags: ["TODO"],
    }),
    updateTodo: builder.mutation<TodoType, TodoType>({
      query: (todo: TodoType) => ({
        url: `todos/${todo.id}/`,
        method: "patch",
        body: todo,
      }),
      invalidatesTags: ["TODO"],
    }),
    deleteTodo: builder.mutation<TodoType, { id: number }>({
      query: (id) => ({
        url: `todos/${id}/`,
        method: "delete",
        body: id,
      }),
      invalidatesTags: ["TODO"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useLazyGetTodosQuery,
} = apiSlice;
