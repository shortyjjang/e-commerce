import React, { useState } from "react";
import { ProductListType, Option } from "@/query/getProductLists";
import InputNumber from "@/etities/InputNumber";
import Button from "@/etities/Button";
import OptionItem from "./OptionItem";

export interface SelectedOption {
  option: Option;
  quantity: number;
}

export default function SelectedCart({
  product,
  callback,
}: {
  product: ProductListType;
  callback: () => void;
}) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  // ✅ 옵션이 없는 경우 기본 상품 수량
  const [baseQuantity, setBaseQuantity] = useState(product.minCount || 1);

  // ✅ 기본 상품 수량 증가/감소 핸들러 (옵션이 없는 경우)
  const handleBaseQuantityChange = (delta: number) => {
    setBaseQuantity((prev) => Math.max(prev + delta, product.minCount || 1));
  };

  // ✅ 장바구니 담기 / 바로 구매하기 핸들러
  const handleAddToCart = () => {
    if((product.optionGroups || []).length > 0 && (selectedOptions || []).length === 0) {
      alert("옵션을 선택해주세요.");
      return;
    }
    console.log("장바구니에 담기:", {
      product,
      selectedOptions,
      baseQuantity:
        product.optionGroups.length === 0 ? baseQuantity : undefined,
    });
    callback();
  };

  const handleBuyNow = () => {
    if((product.optionGroups || []).length > 0 && (selectedOptions || []).length === 0) {
      alert("옵션을 선택해주세요.");
      return;
    }
    console.log("바로 구매:", {
      product,
      selectedOptions,
      baseQuantity:
        product.optionGroups.length === 0 ? baseQuantity : undefined,
    });
    callback();
  };
  return (
    <>
      {/* 헤더 */}
      <div className="flex justify-between items-center pb-2">
        <h3 className="text-lg font-semibold">{product.productName}</h3>
        <span className="text-sm text-gray-500">
          배송비:{" "}
          {product.deliveryFee === 0 ? (
            "무료배송"
          ) : (
            <>
              {product.deliveryFee.toLocaleString()}원
              {product.deliveryFeeType === "EACH" && " (개별배송)"}
            </>
          )}
        </span>
      </div>

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
      <div className="text-lg font-semibold text-right border-t border-gray-200 pt-4">
        {(product.optionGroups || []).length === 0 ? (
          <span>{(product.salePrice * baseQuantity).toLocaleString()}원</span>
        ) : (
          <span>
            {selectedOptions
              .reduce(
                (acc, option) =>
                  acc + option.option.optionPrice * option.quantity,
                0
              )
              .toLocaleString()}
            원
          </span>
        )}
      </div>

      {/* 버튼 그룹 */}
      <div className="mt-4 flex gap-2">
        <Button className="w-full" onClick={handleAddToCart}>
          장바구니 담기
        </Button>
        <Button className="w-full" variant="primary" onClick={handleBuyNow}>
          바로 구매
        </Button>
      </div>
    </>
  );
}
