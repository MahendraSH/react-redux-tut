import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckSquare, ListTodo, TrashIcon } from "lucide-react";
import { FC } from "react";

import {
  TodoType,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "@/app/api/apiSlice";

interface TodoItemProps {
  item: TodoType;
}

const TodoItem: FC<TodoItemProps> = ({ item }) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  return (
    <>
      <Alert className="flex  gap-4   max-w-96 md:max-w-full min-h-20 justify-center items-center">
        <Button
          variant={"default"}
          size={"icon"}
          className="mr-auto"
          onClick={() => {
            updateTodo({ ...item, completed: !item.completed });
          }}
        >
          {item.completed ? (
            <CheckSquare className=" w-6 h-6 text-green-500 " />
          ) : (
            <ListTodo className=" w-6 h-6  text-muted-foreground" />
          )}
        </Button>
        <AlertDescription>{item.title}</AlertDescription>
        <Button
          variant={"destructive"}
          size={"icon"}
          className="ml-auto"
          onClick={() => deleteTodo({ id: item.id })}
        >
          <TrashIcon className=" w-5 h-5 " />
        </Button>
      </Alert>
    </>
  );
};

export default TodoItem;
