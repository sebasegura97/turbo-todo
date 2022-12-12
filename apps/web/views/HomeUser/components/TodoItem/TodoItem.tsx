import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";
import clsx from "clsx";
import { collection, doc } from "firebase/firestore";
import { firestore } from "../../../../utils/firebase";
import Checkbox from "../Checkbox";
import { TodoItemProps } from "./types";

const TodoItem: React.FC<TodoItemProps> = ({ todo, className, listId }) => {
  const collectionRef = collection(firestore, `listas/${listId}/todos/`);
  const docRef = doc(collectionRef, todo.id);

  const { mutate: updateTodo } = useFirestoreDocumentMutation(docRef, {
    merge: true,
  });

  const handleCheckbox = () => {
    updateTodo({ done: !todo.done });
  };

  return (
    <div
      className={clsx(
        "flex items-center w-full px-4 py-3 bg-slate-800",
        className
      )}
    >
      <Checkbox
        checked={todo.done}
        className="mr-3"
        onChange={handleCheckbox}
      />
      <p
        className={clsx("text-white opacity-95", {
          "opacity-60 line-through": todo.done,
        })}
      >
        {todo.task}
      </p>
    </div>
  );
};

export default TodoItem;
