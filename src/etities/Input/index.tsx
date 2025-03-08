
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "small" | "medium" | "large";
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = "medium", className, ...props }, ref) => {
    return (
        <input
          type="text"
          ref={ref}
          {...props}
          className={twMerge(
            "bg-transparent w-full outline-none border border-gray-300 rounded-md px-2 py-1",
            size === "small" && "text-sm py-1",
            size === "medium" && "text-base py-2",
            size === "large" && "text-lg py-3",
            className
          )}
        />
    );
  }
);

Input.displayName = "Input";

export default Input;
