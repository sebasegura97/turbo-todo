import { TodoType } from "../../types";

export type TodoListProps = {
  todos?: TodoType[];
  isLoading?: boolean;
  listId: string;
};

export type FilterOptions = "all" | "active" | "completed";
