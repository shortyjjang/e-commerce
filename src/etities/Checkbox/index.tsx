import React, { forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  checked?: boolean;
  className?: string;
}
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, className, ...props }, ref) => {
    const id = useId();
    return (
      <label htmlFor={id} className={twMerge("flex items-center gap-2", className)}>
        <span
          className={twMerge(
            "relative border border-gray-300 rounded-sm w-4 h-4 bg-white",
            checked && "border-green-500 bg-green-500"
          )}
        >
          <span
            className={twMerge(
              "absolute top-[10px] left-[4.5px] scale-0 transition-transform will-change-transform -rotate-45",
              checked && "scale-100"
            )}
          >
            <span className="w-2.5 h-[2px] bg-white block absolute left-0 bottom-0" />
            <span className="w-[2px] h-[5px] bg-white block absolute left-0 bottom-0" />
          </span>
          <input
            type="checkbox"
            className="absolute left-0 top-0 opacity-0"
            ref={ref}
            id={id}
            checked={checked}
            {...props}
          />
        </span>
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
