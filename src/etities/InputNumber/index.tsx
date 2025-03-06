import React from "react";
import { twMerge } from "tailwind-merge";
export default function InputNumber({
  onIncrease,
  onDecrease,
  value,
  className,
}: {
  onIncrease: () => void;
  onDecrease: () => void;
  value: number;
  className?: string;
}) {
  return (
    <div className={twMerge("flex justify-between items-center gap-2 bg-gray-100 rounded-md p-1", className)}>
      <button className="text-xl aspect-square w-8" onClick={onDecrease}>
        -
      </button>
      <span className="text-sm">{value}</span>
      <button className="text-xl aspect-square w-8" onClick={onIncrease}>
        +
      </button>
    </div>
  );
}
