import InputNumber from "@/etities/InputNumber";
import Select from "@/etities/Select";
import { OptionGroup } from "@/query/getProductLists";
import React from "react";
import { SelectedOption } from "..";
import { twMerge } from "tailwind-merge";
export default function OptionItem({
  optionGroups,
  selectedOptions,
  setSelectedOptions,
}: {
  optionGroups: OptionGroup[];
  selectedOptions: SelectedOption[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOption[]>>;
}) {
  // ✅ 옵션 선택 핸들러
  const handleSelectOption = (optionId: number) => {
    const option = optionGroups
      .find((group) =>
        group.options.some((option) => option.optionId === optionId)
      )
      ?.options.find((option) => option.optionId === optionId);
    if (!option) return;
    if (selectedOptions.some((item) => item.option.optionId === optionId))
      return;
    setSelectedOptions([
      ...selectedOptions,
      { option, quantity: option?.minCount || 1 },
    ]);
  };

  // ✅ 옵션 수량 증가/감소 핸들러
  const handleQuantityChange = (optionId: number, delta: number) => {
    setSelectedOptions((prev) =>
      prev.map((item) =>
        item.option.optionId === optionId
          ? {
              ...item,
              quantity: Math.max(
                item.quantity + delta,
                item.option?.minCount || 1
              ),
            }
          : item
      )
    );
  };

  // ✅ 선택한 옵션 삭제 핸들러
  const handleRemoveOption = (optionId: number) => {
    setSelectedOptions(
      selectedOptions.filter((item) => item.option.optionId !== optionId)
    );
  };
  return (
    <>
      {(optionGroups || []).map((group: OptionGroup) => (
        <Select
          key={group.optionGroupId}
          placeholder={group.optionGroupName}
          options={group.options.map((option) => ({
            label: option.optionName + " (+ " + option.optionPrice + "원)",
            value: option.optionId.toString(),
          }))}
          onChange={(option) => handleSelectOption(Number(option))}
          className="w-full"
        />
      ))}
      {/* 선택한 옵션 목록 */}
      {(selectedOptions || []).length > 0 && (
        <ul>
          {(selectedOptions || []).map(({ option, quantity }, index) => (
            <li
              key={option.optionId}
              className={twMerge("flex justify-between items-center border-t border-gray-200 py-2", index === 0 && "border-t-0")}
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
                  <span className="text-sm">{optionGroups.find((group) => group.options.some((option) => option.optionId === option.optionId))?.optionGroupName}: {option.optionName}</span>
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
          ))}
        </ul>
      )}
    </>
  );
}
