import clsx from "clsx";
import { useAppContext } from "../../hooks/useAppContext";
import { FILTERS } from "./constants";

const TodoFooter = () => {
  const { remaining, filterTodos, clearCompletedTodos, activeFilter } =
    useAppContext();
  return (
    <div className="flex items-center justify-between  px-4 bg-slate-200 dark:bg-slate-800 rounded-b-lg">
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
            className={clsx("text-xs hover:opacity-75 transition-all py-4", {
              "opacity-50": activeFilter !== item.key,
            })}
            onClick={() => filterTodos(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <button className="text-xs" onClick={clearCompletedTodos}>
        Clear completed
      </button>
    </div>
  );
};

export default TodoFooter;
