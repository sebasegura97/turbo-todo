import { ChangeEvent, KeyboardEvent, useState } from "react";
import clsx from "clsx";

import Checkbox from "../Checkbox";
import TextField from "../TextField";
import { TodoInputProps } from "./types";
import { useAppContext } from "../../hooks/useAppContext";

const TodoInput: React.FC<TodoInputProps> = ({ className }) => {
  const [task, setTask] = useState("");
  const [done, setDone] = useState(false);
  const { createTodo } = useAppContext();

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && task.length) {
      resetInput();
      createTodo({ task, done });
    }
  };

  const resetInput = () => {
    if (task) {
      setTask("");
      setDone(false);
    }
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
        "flex items-center dark:bg-slate-800 bg-slate-200 px-4 py-3 rounded-md",
        className
      )}
    >
      <Checkbox
        data-testid="todo-input-checkbox"
        checked={done}
        onChange={handleCheckbox}
        className="mr-4"
      />
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
