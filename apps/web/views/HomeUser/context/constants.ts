import { AppContextType } from "./types";

export const INITIAL_STATE: AppContextType = {
  listId: "",
  remaining: 0,
  activeFilter: "all",
  todos: [],
  isLoading: false,
  updateTodo: () => {},
  createTodo: () => {},
  filterTodos: () => {},
  clearCompletedTodos: () => {},
  reorderTodos: () => {},
};
