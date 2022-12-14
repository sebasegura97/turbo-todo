import { FilterOptions } from "../hooks/useTodoList";
import { CreateTodoType, FirestoreTodo } from "../types";

export type AppContextType = {
  listId: string;
  remaining: number;
  activeFilter: FilterOptions;
  todos: FirestoreTodo[];
  isLoading: boolean;
  updateTodo: (todoId: string, value: FirestoreTodo) => void;
  createTodo: ({ task, done }: CreateTodoType) => void;
  filterTodos: (filter: FilterOptions) => void;
  clearCompletedTodos: () => void;
  reorderTodos: (newtodos: FirestoreTodo[]) => void;
};
