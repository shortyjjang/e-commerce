import React, { Dispatch, SetStateAction, useMemo } from "react";
import { ProductListType } from "@/query/getProductLists";
import InputNumber from "@/etities/InputNumber";
import OptionItem from "./OptionItem";
import { SelectedOption } from "@/hooks/useSelectCart";

export default function SelectedCart({
  product,
  selectedOptions,
  setSelectedOptions,
  baseQuantity,
  setBaseQuantity,
}: {
  product: ProductListType;
  selectedOptions: SelectedOption[];
  setSelectedOptions: Dispatch<SetStateAction<SelectedOption[]>>;
  baseQuantity: number;
  setBaseQuantity: Dispatch<SetStateAction<number>>;
}) {
  // ✅ 기본 상품 수량 증가/감소 핸들러 (옵션이 없는 경우)
  const handleBaseQuantityChange = (delta: number) => {
    setBaseQuantity((prev) => Math.max(prev + delta, product.minCount || 1));
  };

  // 총 가격 계산 로직을 useMemo로 최적화
  const totalPrice = useMemo(() => {
    if (product.optionGroups.length === 0) {
      return product.salePrice * baseQuantity;
    }
    return selectedOptions.reduce(
      (acc, option) => acc + option.option.optionPrice * option.quantity,
      0
    );
  }, [product, selectedOptions, baseQuantity]);

  const deliveryFee = useMemo(() => {
    return (
      product.deliveryFee +
      (product.deliveryFeeType === "EACH"
        ? selectedOptions.length === 0
          ? baseQuantity
          : selectedOptions.length
        : 0)
    )
  }, [product, selectedOptions, baseQuantity]);
  return (
    <>

      {/* 옵션 그룹 */}
      {(product.optionGroups || []).length > 0 ? (
        <OptionItem
          optionGroups={product.optionGroups}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      ) : (
        <InputNumber
          onIncrease={() => handleBaseQuantityChange(1)}
          onDecrease={() => handleBaseQuantityChange(-1)}
          value={baseQuantity}
          className="w-full"
        />
      )}

      {/* 최종금액 */}
      <div className="flex flex-col gap-1 mt-4">
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-500">총 상품금액</label>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-500">배송비</label>
          <span>{deliveryFee.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between items-center text-lg font-semibold border-t pt-2 mt-1">
          <label className="text-base">총 금액</label>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>
      </div>
    </>
  );
}
