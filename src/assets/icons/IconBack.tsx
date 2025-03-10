import React from "react";
import { twMerge } from "tailwind-merge";
export default function IconBack({className}: {className?: string}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={twMerge("w-6 h-6", className)}
    >
      <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
    </svg>
  );
}
