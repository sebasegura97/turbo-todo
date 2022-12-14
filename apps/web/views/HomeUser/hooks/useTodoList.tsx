import {
  useFirestoreDocument,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";
import {
  arrayUnion,
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore";
import { firestore } from "../../../utils/firebase";
import { FirestoreTodoList, FirestoreTodo, CreateTodoType } from "../types";

const useTodoList = (listId: string) => {
  const ref = doc(firestore, "listas", listId).withConverter({
    toFirestore(list: WithFieldValue<FirestoreTodoList>): DocumentData {
      return { ...list };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): FirestoreTodoList {
      const data = snapshot.data(options)!;
      return { ...data };
    },
  });

  const { data, isLoading } = useFirestoreDocument(["listas", listId], ref, {
    subscribe: true,
  });

  const todos = data?.data()?.todos as FirestoreTodo[];

  const { mutate } = useFirestoreDocumentMutation(ref, {
    merge: true,
  });

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

  return {
    todos: todos?.filter((todo) => todo.deletedAt === null),
    isLoading,
    mutate,
    updateTodo,
    createTodo,
  };
};

export default useTodoList;
