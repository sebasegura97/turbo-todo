import { FirestoreTodo } from "../../types";

export type TodoItemProps = {
  todo: FirestoreTodo & { id: string };
  className?: string;
  listId: string;
};
