import Button from "@/etities/Button";
import SelectedCart from "@/features/SelectedCart";
import useSelectCart from "@/hooks/useSelectCart";
import { ProductListType } from "@/query/getProductLists";
import React from "react";

export default function CartOverlay({
  product,
  onClose,
}: {
  product: ProductListType;
  onClose: () => void;
}) {
  const {
    selectedOptions,
    handleAddToCart,
    handleBuyNow,
    setSelectedOptions,
    setBaseQuantity,
    baseQuantity,
  } = useSelectCart(product);
  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-end z-[+100]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white p-4 rounded-t-md w-full">
        {/* 헤더 */}
        <h3 className="text-lg font-semibold pb-2">{product.productName}</h3>
        <SelectedCart
          product={product}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          baseQuantity={baseQuantity}
          setBaseQuantity={setBaseQuantity}
        />
        {/* 버튼 그룹 */}
        <div className="mt-4 flex gap-2">
          <Button className="w-full" onClick={() => handleAddToCart(onClose)}>
            장바구니 담기
          </Button>
          <Button
            className="w-full"
            variant="primary"
            onClick={() => handleBuyNow(onClose)}
          >
            바로 구매
          </Button>
        </div>
      </div>
    </div>
  );
}
