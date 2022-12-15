import clsx from "clsx";
import { Reorder } from "framer-motion";

import { TodoListProps } from "./types";
import TodoItem from "../TodoItem";
import { useAppContext } from "../../hooks/useAppContext";

const TodoList: React.FC<TodoListProps> = () => {
  const { remaining, reorderTodos, activeFilter, todos, isLoading } =
    useAppContext();

  if (isLoading) {
    return (
      <div className="dark:bg-slate-800 bg-slate-200 rounded-t-lg px-4 py-3 h-12 flex items-center">
        Loading...
      </div>
    );
  }

  if (!isLoading && !todos?.length) {
    return (
      <div className="dark:bg-slate-800 bg-slate-200 rounded-t-lg px-4 py-3 h-12 flex items-center">
        <p> Write your first task </p>
      </div>
    );
  }

  if (todos?.length) {
    return (
      <div className="dark:bg-slate-800 bg-slate-200 rounded-t-lg text-opacity-50 overflow-auto">
        {remaining === 0 && activeFilter !== "all" && (
          <p className="py-3 px-4"> There isnt tasks that match filters </p>
        )}
        <Reorder.Group values={todos} axis="y" onReorder={reorderTodos}>
          {todos.map((todo) => (
            <Reorder.Item value={todo} key={todo.id}>
              <TodoItem
                todo={{ id: todo.id || "", ...todo }}
                className={clsx("border-b border-b-white border-opacity-5", {
                  hidden:
                    (activeFilter === "active" && todo.done) ||
                    (activeFilter === "completed" && !todo.done) ||
                    todo.deletedAt !== null,
                })}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    );
  }
  return <p> Ha ocurrido un error inesperado</p>;
};

export default TodoList;
