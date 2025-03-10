"use client";
import Button from "@/etities/Button";
import { useCart } from "@/layout/LayoutProvider";
import { useRouter } from "next/navigation";
import React from "react";

export default function CartPaymentButton({
  selectedItems,
}: {
  selectedItems: number[];
}) {
  const { cart, setPaymentItems } = useCart();
  const router = useRouter();
  return (
    <Button
      className="w-full relative font-semibold"
      variant="primary"
      onClick={() => {
        setPaymentItems(
          cart.filter((item) => selectedItems.includes(item.productId))
        );
        router.push("/order");
      }}
    >
      주문하기
    </Button>
  );
}
