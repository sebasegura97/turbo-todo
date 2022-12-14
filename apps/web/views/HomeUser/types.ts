import { Timestamp } from "firebase/firestore";

export type HomeUserProps = {
  listId: string;
};

export type FirestoreTodo = {
  id?: string;
  task?: string;
  done?: boolean;
  deletedAt?: Timestamp | null;
};

export type FirestoreTodoList = {
  todos?: FirestoreTodo[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateTodoType = {
  task: string;
  done?: boolean;
};
