"use client";

import IconBack from "@/assets/icons/IconBack";
import CartList from "@/features/Order/Cart/CartList";
import CartPaymentButton from "@/features/Order/Cart/CartPaymentButton";
import { useCart } from "@/layout/LayoutProvider";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

export default function CartPage() {
  const { cart } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const router = useRouter();
  const totalPrice = useMemo(
    () =>
      cart
        .filter((item) => selectedItems.includes(item.productId))
        .reduce(
          (acc, curr) =>
            acc +
            (curr.options.length > 0
              ? curr.options.reduce(
                  (acc, option) =>
                    acc +
                    (option.option.optionPrice + curr.salePrice) *
                      option.quantity,
                  0
                )
              : curr.salePrice * curr.quantity),
          0
        ),
    [cart, selectedItems]
  );

  const deliveryFee = useMemo(
    () =>
      cart
        .filter((item) => selectedItems.includes(item.productId))
        .reduce(
          (acc, curr) =>
            acc +
            (curr.deliveryFeeType === "ALL"
              ? curr.deliveryFee
              : curr.deliveryFee *
                (curr.options.length > 0
                  ? curr.options.reduce(
                      (acc, option) => acc + option.quantity,
                      0
                    )
                  : curr.quantity)),
          0
        ),
    [cart, selectedItems]
  );

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-10">
        <div className="bg-white">
            <button onClick={() => router.back()} aria-label="뒤로가기" className="p-4"><IconBack /></button>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-[auto_300px] gap-4 py-4 pt-18">
        <div className="bg-gray-100 fixed top-0 left-0 w-full h-full" />
        <CartList
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        <div className="flex flex-col gap-4">
          <div className="relative bg-white rounded-lg p-4">
            {/* 최종금액 */}
            <div className="flex flex-col gap-1 mt-4 lg:mt-0">
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
                <span>{(totalPrice + deliveryFee).toLocaleString()}원</span>
              </div>
            </div>
          </div>
          <CartPaymentButton selectedItems={selectedItems} />
        </div>
      </div>
    </>
  );
}
