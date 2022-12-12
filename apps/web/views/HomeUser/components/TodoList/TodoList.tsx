import clsx from "clsx";
import { doc, Timestamp, updateDoc } from "firebase/firestore";

import { useState } from "react";
import { firestore } from "../../../../utils/firebase";

import useTodoList from "../../hooks/useTodoList";

import TodoItem from "../TodoItem";
import { FilterOptions, TodoListProps } from "./types";

const TodoList: React.FC<TodoListProps> = ({ listId }) => {
  const { isLoading, todos } = useTodoList(listId);
  const [filter, setFilter] = useState<FilterOptions>("all");

  const handleFilter = (filter: FilterOptions) => {
    setFilter(filter);
  };

  const handleClearCompleted = () => {
    todos?.forEach(async (todo) => {
      if (todo.done) {
        const docRef = doc(firestore, `listas/${listId}/todos/${todo.id}`);
        // As we need to dinamically generate the docRef we can't use react-query-firebase
        // for batching update docs in a collection.
        await updateDoc(docRef, {
          deletedAt: Timestamp.now(),
        });
      }
    });
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (!isLoading && !todos?.length) {
    return <p> Create your first task! </p>;
  }

  if (todos?.length) {
    const remaining = todos.reduce(
      (prev, todo) => (!todo.done ? prev + 1 : prev),
      0
    );

    return (
      <>
        {/* Todo List */}
        <div className="rounded-t-lg overflow-y-scroll max-h-64">
          {todos.map((todo, i) => (
            <TodoItem
              key={`todo-item-${i}`}
              todo={todo}
              listId={listId}
              className={clsx("border-b border-b-white border-opacity-5", {
                hidden:
                  (filter === "active" && todo.done) ||
                  (filter === "completed" && !todo.done) ||
                  todo.deletedAt !== null,
              })}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between py-2 px-4 bg-slate-800 rounded-b-lg text-white">
          <span
            className={clsx("text-xs text-opacity-50 ", {
              "oapcity-60": remaining === 0,
            })}
          >
            {remaining} pending
          </span>

          <div>
            <button
              className={clsx("text-xs", {
                "opacity-50": filter !== "all",
              })}
              onClick={() => handleFilter("all")}
            >
              All
            </button>
            <button
              className={clsx("text-xs mx-2 ", {
                "opacity-50": filter !== "active",
              })}
              onClick={() => handleFilter("active")}
            >
              Acitve
            </button>
            <button
              className={clsx("text-xs ", {
                "opacity-50": filter !== "completed",
              })}
              onClick={() => handleFilter("completed")}
            >
              Completed
            </button>
          </div>

          <button className="text-xs" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </div>
      </>
    );
  }
  return <p> Ha ocurrido un error inesperado</p>;
};

export default TodoList;
