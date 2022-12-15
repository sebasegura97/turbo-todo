import clsx from "clsx";

import { FILTERS } from "./constants";
import { useAppContext } from "../../hooks/useAppContext";

const TodoFooter = () => {
  const { remaining, filterTodos, clearCompletedTodos, activeFilter } =
    useAppContext();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 sm:grid-rows-1 grid-rows-2 px-4 bg-slate-200 dark:bg-slate-800 rounded-b-lg">
      <span
        className={clsx("text-xs text-opacity-50 self-center", {
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
              "text-xs hover:opacity-75 transition-all py-2 sm:py-4",
              {
                "opacity-50": activeFilter !== item.key,
              }
            )}
            onClick={() => filterTodos(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <button
        className="text-xs opacity-50 hover:opacity-75 justify-self-start sm:justify-self-end self-center py-1"
        onClick={clearCompletedTodos}
      >
        Clear completed
      </button>
    </div>
  );
};

export default TodoFooter;
