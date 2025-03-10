import Select from "@/etities/Select";
import { OptionGroup } from "@/query/getProductLists";
import React from "react";
import { CartItemOptions } from "@/layout/LayoutProvider";
import SelectedOptions from "../SelectedOptions";
export default function OptionItem({
  optionGroups,
  selectedOptions,
  setSelectedOptions,
}: {
  optionGroups: OptionGroup[];
  selectedOptions: CartItemOptions[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<CartItemOptions[]>>;
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
      {
        option: {
          ...option,
          optionGroupName:
            optionGroups.find((group) =>
              group.options.some((option) => option.optionId === optionId)
            )?.optionGroupName || "",
        },
        quantity: option?.minCount || 1,
      },
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
            <SelectedOptions
              key={option.optionId}
              option={option}
              optionGroupName={
                optionGroups.find((group) =>
                  group.options.some(
                    (option) => option.optionId === option.optionId
                  )
                )?.optionGroupName || ""
              }
              handleRemoveOption={handleRemoveOption}
              handleQuantityChange={handleQuantityChange}
              quantity={quantity}
              className={
                index === 0
                  ? "border-t-0"
                  : index === selectedOptions.length - 1
                  ? "pb-0"
                  : ""
              }
            />
          ))}
        </ul>
      )}
    </>
  );
}
