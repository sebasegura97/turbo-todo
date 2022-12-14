import {
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import {
  useFirestoreDocument,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";

import { FirestoreTodoList, FirestoreTodo } from "../types";

import { firestore } from "../../../utils/firebase";

export type FilterOptions = "all" | "active" | "completed";

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

  let todos = data?.data()?.todos as FirestoreTodo[];

  const { mutate } = useFirestoreDocumentMutation(ref, {
    merge: true,
  });

  return {
    todos: todos?.filter((todo) => todo.deletedAt === null) || [],
    isLoading,
    mutate,
  };
};

export default useTodoList;
