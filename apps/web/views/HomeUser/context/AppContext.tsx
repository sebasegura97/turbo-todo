import { arrayUnion, Timestamp } from "firebase/firestore";
import React, { createContext, useState } from "react";
import useTodoList, { FilterOptions } from "../hooks/useTodoList";
import { CreateTodoType, FirestoreTodo } from "../types";
import { AppContextType } from "./types";

export const AppContext = createContext<AppContextType>({
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
});

const { Provider } = AppContext;

export const AppContextProvider: React.FC<{
  children: React.ReactNode;
  listId: string;
}> = ({ children, listId }) => {
  const { isLoading, mutate, todos } = useTodoList(listId);
  const [activeFilter, setActiveFilter] = useState<FilterOptions>("all");

  const remaining = todos?.reduce((prev, todo) => {
    switch (activeFilter) {
      case "all":
        return !todo.done ? prev + 1 : prev;
      case "active":
        return !todo.done ? prev + 1 : prev;
      case "completed":
        return todo.done ? prev + 1 : prev;
    }
  }, 0);

  const updateTodo = (todoId: string, value: FirestoreTodo) => {
    const updatedTodos = todos?.map((item) => {
      if (item.id === todoId) {
        return { ...item, ...value };
      } else {
        return item;
      }
    });

    mutate({ todos: updatedTodos });
  };

  const createTodo = ({ task, done }: CreateTodoType) => {
    mutate({
      todos: arrayUnion({
        id: Math.floor(Math.random() * 100),
        task,
        done,
        createdAt: Timestamp.now(),
        deletedAt: null,
      }),
    });
  };

  const filterTodos = (filter: FilterOptions) => {
    setActiveFilter(filter);
  };

  const clearCompletedTodos = () => {
    const newTodoList = todos?.map((todo) => {
      if (todo.done) {
        return { ...todo, deletedAt: Timestamp.now() };
      } else {
        return todo;
      }
    });

    mutate({ todos: newTodoList });
  };

  const reorderTodos = (newtodos: FirestoreTodo[]) => {
    mutate({ todos: newtodos });
  };

  const value = {
    isLoading,
    listId,
    remaining,
    activeFilter,
    todos,
    updateTodo,
    createTodo,
    filterTodos,
    clearCompletedTodos,
    reorderTodos,
  };

  return <Provider value={value}>{children}</Provider>;
};
