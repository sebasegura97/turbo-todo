import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import {
  collection,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
  WithFieldValue,
} from "firebase/firestore";
import { firestore } from "../../../utils/firebase";
import { TodoType } from "../types";

const useTodoList = (listId: string) => {
  const ref = query(
    collection(firestore, `listas/${listId}/todos`),
    orderBy("order", "desc")
    // If you add where deletedAt it'll break the order (could improve with a transaction)
    // where("deletedAt", "==", null)
  ).withConverter<TodoType>({
    toFirestore: (data: WithFieldValue<TodoType>) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      const converted = {
        id: snap.id,
        ...snap.data(),
      };
      return converted as TodoType;
    },
  });

  const { isLoading, data: todos } = useFirestoreQueryData<TodoType>(
    [`listas/${listId}/todos`],
    ref,
    { subscribe: true }
  );

  return {
    isLoading,
    todos,
  };
};

export default useTodoList;
