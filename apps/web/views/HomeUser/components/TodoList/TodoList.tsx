import { useState } from "react";
import clsx from "clsx";
import { Timestamp } from "firebase/firestore";
import { Reorder } from "framer-motion";

import { FilterOptions, TodoListProps } from "./types";
import TodoItem from "../TodoItem";
import useTodoList from "../../hooks/useTodoList";
import { FirestoreTodo } from "../../types";
import { FILTERS } from "./constants";

const TodoList: React.FC<TodoListProps> = ({ listId }) => {
  const [activeFilter, setActiveFilter] = useState<FilterOptions>("all");
  const { isLoading, mutate, todos } = useTodoList(listId);

  const handleFilter = (filter: FilterOptions) => {
    setActiveFilter(filter);
  };

  const handleClearCompleted = () => {
    const newTodoList = todos?.map((todo) => {
      if (todo.done) {
        return { ...todo, deletedAt: Timestamp.now() };
      } else {
        return todo;
      }
    });

    mutate({ todos: newTodoList });
  };

  const handleReorder = (newtodos: FirestoreTodo[]) => {
    mutate({ todos: newtodos });
  };

  if (isLoading) {
    return <div className="bg-slate-800 rounded-lg h-12"></div>;
  }

  if (!isLoading && !todos?.length) {
    return (
      <div className="bg-slate-800 rounded-lg px-4 py-3 h-12 flex items-center">
        <p className="text-white"> Write your first task </p>
      </div>
    );
  }

  if (todos?.length) {
    const remaining = todos.reduce((prev, todo) => {
      switch (activeFilter) {
        case "all":
          return prev + 1;
        case "active":
          return !todo.done ? prev + 1 : prev;
        case "completed":
          return todo.done ? prev + 1 : prev;
      }
    }, 0);

    return (
      <div className="bg-slate-800 rounded-lg text-white text-opacity-50 pt-3">
        {remaining === 0 && (
          <p className="pb-4 px-4"> Any task match filters </p>
        )}
        {/* Todo List */}
        <Reorder.Group values={todos} axis="y" onReorder={handleReorder}>
          {todos.map((todo) => (
            <Reorder.Item value={todo} key={todo.id}>
              <TodoItem
                todo={{ id: todo.id || "", ...todo }}
                listId={listId}
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

        {/* Footer */}
        <div className="flex items-center justify-between  px-4">
          <span
            className={clsx("text-xs text-opacity-50 ", {
              "oapcity-60": remaining === 0,
            })}
          >
            {remaining} remaining
          </span>

          <div className="grid grid-flow-col gap-3">
            {FILTERS.map((item) => (
              <button
                key={`filter-${item.key}`}
                className={clsx(
                  "text-xs hover:opacity-75 transition-all py-4",
                  {
                    "opacity-50": activeFilter !== item.key,
                  }
                )}
                onClick={() => handleFilter(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="text-xs" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </div>
      </div>
    );
  }
  return <p> Ha ocurrido un error inesperado</p>;
};

export default TodoList;
