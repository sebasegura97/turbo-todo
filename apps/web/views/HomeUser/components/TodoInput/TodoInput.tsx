import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { collection } from "firebase/firestore";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";

import { firestore } from "../../../../utils/firebase";
import Checkbox from "../Checkbox";
import TextField from "../TextField";
import { TodoInputProps } from "./types";
import useTodoList from "../../hooks/useTodoList";

const TodoInput: React.FC<TodoInputProps> = ({ className, listId }) => {
  const [task, setTask] = useState("");
  const [done, setDone] = useState(false);
  const { todos } = useTodoList(listId);

  const todoCollectionRef = collection(firestore, `listas/${listId}/todos/`);
  const mutation = useFirestoreCollectionMutation(todoCollectionRef);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && task.length) {
      setTask("");
      handleCreateTodo();
    }
  };

  const resetInput = () => {
    if (task) {
      setDone(false);
    }
  };

  const handleCreateTodo = () => {
    mutation.mutate(
      {
        task,
        deletedAt: null,
        done,
        order: todos ? todos.length + 1 : 0,
      },
      {
        onSuccess: resetInput,
      }
    );
  };

  const handleCheckbox = () => {
    setDone(!done);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  return (
    <div
      className={clsx(
        "flex items-center bg-slate-800 px-4 py-3 rounded-md",
        className
      )}
    >
      <Checkbox checked={done} onChange={handleCheckbox} className="mr-4" />
      <TextField
        placeholder="Create a new todo"
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        value={task}
      />
    </div>
  );
};

export default TodoInput;
