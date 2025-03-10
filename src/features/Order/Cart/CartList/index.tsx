import Checkbox from '@/etities/Checkbox';
import { useCart } from '@/layout/LayoutProvider';
import React from 'react'
import Image from 'next/image';
import InputNumber from '@/etities/InputNumber';
import SelectedOptions from '@/widget/SelectedCart/SelectedOptions';

export default function CartList({
    selectedItems,
    setSelectedItems
}: {
    selectedItems: number[];
    setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
}) {
    const { cart, setCart } = useCart();
    // ✅ 옵션 수량 증가/감소 핸들러
    const handleQuantityChange = (
      optionId: number,
      delta: number,
      productId: number
    ) => {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId &&
          item.options.some((option) => option.option.optionId === optionId)
            ? {
                ...item,
                quantity: item.quantity + delta,
                options: item.options.map((option) =>
                  option.option.optionId === optionId
                    ? { ...option, quantity: option.quantity + delta }
                    : option
                ),
              }
            : item
        )
      );
    };
  
    // ✅ 선택한 옵션 삭제 핸들러
    const handleRemoveOption = (optionId: number, productId: number) => {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId &&
          item.options.some((option) => option.option.optionId === optionId)
            ? {
                ...item,
                options: item.options.filter(
                  (option) => option.option.optionId !== optionId
                ),
                quantity: item.options.reduce(
                  (acc, option) => acc + option.quantity,
                  0
                ),
              }
            : item
        )
      );
    };
  
    // ✅ 기본 상품 수량 증가/감소 핸들러
    const handleBaseQuantityChange = (productId: number, delta: number) => {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
            : item
        )
      );
    };
  return (
    <div className="flex flex-col gap-4">
      {cart.map((item) => (
        <div
          className="relative bg-white rounded-lg p-4"
          key={item.productId}
        >
          <div className="grid grid-cols-[70px_auto] lg:grid-cols-[95px_auto] gap-2">
            <div className="relative flex items-center justify-between">
              <Checkbox
                checked={selectedItems.includes(item.productId)}
                onChange={() =>
                  setSelectedItems((prev) =>
                    prev.includes(item.productId)
                      ? prev.filter((id) => id !== item.productId)
                      : [...prev, item.productId]
                  )
                }
                className="absolute top-0 left-0 lg:static"
              />
              <Image
                src={item.listImageUrl}
                alt={item.productName}
                width={70}
                height={70}
              />
            </div>
            <div>
              <div>{item.productName}</div>
              <div className="text-sm ">
                {item.salePrice.toLocaleString()}원{" "}
                <span className="text-gray-500 line-through">
                  {item.netPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
          {item.options.length > 0 ? (
            item.options.map((option, index) => (
              <SelectedOptions
                key={option.option.optionId}
                option={option.option}
                optionGroupName={option.option.optionGroupName || ""}
                handleRemoveOption={(optionId) =>
                  handleRemoveOption(optionId, item.productId)
                }
                handleQuantityChange={(optionId, delta) =>
                  handleQuantityChange(optionId, delta, item.productId)
                }
                quantity={option.quantity}
                className={index === 0 ? "border-t-0" : ""}
              />
            ))
          ) : (
            <InputNumber
              onIncrease={() => handleBaseQuantityChange(item.productId, 1)}
              onDecrease={() => handleBaseQuantityChange(item.productId, -1)}
              value={item.quantity}
            />
          )}
          <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-black font-medium">
            <div className="flex justify-between items-center">
              <label>총 상품금액</label>
              <span>
                {(item.options.length === 0
                  ? item.salePrice * item.quantity
                  : item.options.reduce(
                      (acc, option) =>
                        acc +
                        (option.option.optionPrice + item.salePrice) *
                          option.quantity,
                      0
                    )
                ).toLocaleString()}
                원
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <label className="">배송비</label>
              <span>
                {item.deliveryFeeType === "ALL"
                  ? item.deliveryFee.toLocaleString()
                  : (item.deliveryFee * item.quantity).toLocaleString()}
                원
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
