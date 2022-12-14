import { forwardRef } from "react";
import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/20/solid";
import type { CheckboxProps } from "./types";

// I'm using React.forwardRef for flexibility and eventual compatibility with forms handling
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className={clsx("relative hover:cursor-pointer", className)}>
        {/* The input[type='checkbox'] selector is hiding it in globals.css */}
        <input type="checkbox" ref={ref} {...props} />
        <span
          className={clsx(
            "relative block z-10 h-6 w-6 bg-transparent border dark:border-white border-slate-900  rounded-full focus:outline-none",
            {
              "from-blue-700 to-fuchsia-600 bg-gradient-to-r border-none":
                props.checked,
            }
          )}
        />
        {props.checked && (
          <CheckIcon className="absolute inset-0 text-white h-4 w-4 m-auto z-20" />
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
