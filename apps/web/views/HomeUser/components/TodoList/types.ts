import { FirestoreTodo } from "../../types";

export type TodoListProps = {
  todos?: FirestoreTodo[];
  isLoading?: boolean;
  listId: string;
};

export type FilterOptions = "all" | "active" | "completed";

export type FilterType = {
  label: string;
  key: FilterOptions;
};
