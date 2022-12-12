import { forwardRef } from "react";
import clsx from "clsx";
import type { TextFieldProps } from "./types";

// I'm using React.forwardRef for flexibility and eventual compatibility with forms handling
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className="relative hover:cursor-pointer">
        <input
          type="text"
          ref={ref}
          className={clsx(
            "focus:outline-none text-white w-full bg-transparent disabled:opacity-50",
            className
          )}
          {...props}
        />
      </label>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
