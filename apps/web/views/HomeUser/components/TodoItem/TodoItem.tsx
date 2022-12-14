import clsx from "clsx";

import useTodoList from "../../hooks/useTodoList";
import Checkbox from "../Checkbox";

import { TodoItemProps } from "./types";

const TodoItem: React.FC<TodoItemProps> = ({ todo, className, listId }) => {
  const { updateTodo } = useTodoList(listId);

  return (
    <div
      className={clsx(
        "flex items-center w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 hover:cursor-pointer",
        className
      )}
    >
      <Checkbox
        checked={todo.done}
        className="mr-3"
        onChange={() => updateTodo(todo.id, { done: !todo.done })}
      />
      <p
        className={clsx("text-white opacity-95", {
          "opacity-60 line-through": todo.done,
        })}
      >
        {todo.task}
      </p>
    </div>
  );
};

export default TodoItem;
