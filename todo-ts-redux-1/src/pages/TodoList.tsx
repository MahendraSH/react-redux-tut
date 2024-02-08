import { useGetTodosQuery } from "@/app/api/apiSlice";
import TodoItem from "@/components/todo-item";
import ErrorComponent from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";

interface TodoListProps {}

const TodoList: FC<TodoListProps> = ({}) => {
  const {
    data: todos,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTodosQuery({});

  if (isLoading) {
    <Loading />;
  }
  if (isError) {
    <ErrorComponent error={error} />;
  }

  if (isSuccess) {
    return (
      <div className=" flex flex-col  justify-center items-center   w-full px-4   gap-y-4  md:min-w-96 ">
        <h2 className=" text-2xl font-semibold text-pretty leading-tight w-full">
          Todo List
          <Separator className=" mt-1 bg-accent-foreground " />
        </h2>

        <div className=" flex flex-col justify-center items-center gap-3 mt-4  ">
          {todos.map(item=>(

          <TodoItem  key={item.id} item={item}/>
          ))}
        </div>
      </div>
    );
  }
};

export default TodoList;
