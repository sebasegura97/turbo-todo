import { Timestamp } from "firebase/firestore";

export type HomeUserProps = {
  listId: string;
};

export type TodoList = {
  id: string;
  todos: TodoType[];
  createdAt: Date;
  updatedAt?: Date;
};

export type TodoListInput = {
  createdAt: string;
};

export type TodoType = {
  id: string;
  task: string;
  done: boolean;
  deletedAt: Timestamp;
};

export type TodoInput = {
  task?: string;
  done?: boolean;
};
