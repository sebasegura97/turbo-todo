import { forwardRef } from "react";
import clsx from "clsx";
import type { TextFieldProps } from "./types";

// I'm using React.forwardRef for flexibility and eventual compatibility with forms handling
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="text"
        ref={ref}
        className={clsx(
          "focus:outline-none w-full bg-transparent disabled:opacity-75",
          className
        )}
        {...props}
      />
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
