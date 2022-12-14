import clsx from "clsx";

import { TodoItemProps } from "./types";
import Checkbox from "../Checkbox";
import { useAppContext } from "../../hooks/useAppContext";

const TodoItem: React.FC<TodoItemProps> = ({ todo, className }) => {
  const { updateTodo } = useAppContext();

  return (
    <div
      className={clsx(
        "flex items-center w-full px-4 py-3 hover:bg-slate-100 transition-all dark:hover:bg-slate-700 hover:cursor-pointer",
        className
      )}
    >
      <Checkbox
        checked={todo.done}
        className="mr-3"
        onChange={() => updateTodo(todo.id, { done: !todo.done })}
      />
      <p
        className={clsx("opacity-95", {
          "opacity-60 line-through": todo.done,
        })}
      >
        {todo.task}
      </p>
    </div>
  );
};

export default TodoItem;
