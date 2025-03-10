import InputNumber from '@/etities/InputNumber';
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Option } from '@/query/getProductLists';

export default function SelectedOptions({
  option,
  optionGroupName,
  handleRemoveOption,
  handleQuantityChange,
  quantity,
  className,
}: {
  option: Option;
  optionGroupName: string;
  handleRemoveOption: (optionId: number) => void;
  handleQuantityChange: (optionId: number, delta: number) => void;
  quantity: number;
  className?: string;
}) {
  return (
    <li
      key={option.optionId}
      className={twMerge("flex justify-between items-center border-t border-gray-200 py-2", className)}
    >
      <div className="flex gap-2">
        <button
          className="text-gray-500"
          onClick={() => handleRemoveOption(option.optionId)}
          aria-label="삭제"
        >
          ✕
        </button>
        <div className="flex flex-col">
          <span className="text-sm">[{optionGroupName}] {option.optionName}</span>
          <span className="text-gray-500 text-xs">
            (+{option.optionPrice}원)
          </span>
        </div>
      </div>
      <InputNumber
        onIncrease={() => handleQuantityChange(option.optionId, 1)}
        onDecrease={() => handleQuantityChange(option.optionId, -1)}
        value={quantity}
      />
    </li>
  )
}
