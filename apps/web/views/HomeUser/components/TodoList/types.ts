import { FilterOptions } from "../../hooks/useTodoList";
import { FirestoreTodo } from "../../types";

export type TodoListProps = {
  todos?: FirestoreTodo[];
  isLoading?: boolean;
};

export type FilterType = {
  label: string;
  key: FilterOptions;
};
