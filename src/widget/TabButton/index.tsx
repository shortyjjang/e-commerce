import React from "react";
import { twMerge } from "tailwind-merge";
export function ProductTabButton({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "w-full p-3 border-b-2 border-gray-200 text-gray-500",
        active && "text-black font-bold border-black"
      )}
    >
      {children}
    </button>
  );
}

export default ProductTabButton;
