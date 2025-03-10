import { useCart } from "@/layout/LayoutProvider";
import React from "react";
import Image from "next/image";

export default function PaymentList() {
  const { paymentItems } = useCart();
  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg p-4">
      {paymentItems.map((item) => (
        <React.Fragment key={item.productId}>
          <div className="grid grid-cols-[70px_auto] gap-2">
            <div className="relative flex items-center justify-between">
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
              {item.options.length > 0 ? (
                item.options.map((option) => (
                  <div
                    key={option.option.optionId}
                    className="text-sm text-gray-500"
                  >
                    {option.option.optionName}(+
                    {option.option.optionPrice.toLocaleString()}원){" "}
                    {option.quantity}개
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">{item.quantity}개</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-2 border-t border-black font-medium">
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
        </React.Fragment>
      ))}
    </div>
  );
}
