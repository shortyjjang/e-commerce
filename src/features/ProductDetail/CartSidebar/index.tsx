import Button from "@/etities/Button";
import SelectedCart from "@/features/SelectedCart";
import useSelectCart from "@/hooks/useSelectCart";
import { ProductListType } from "@/query/getProductLists";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
interface CartSidebarProps {
  product: ProductListType;
}

const CartSidebar = ({ product }: CartSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
        className={twMerge(
          "fixed flex justify-center items-end z-[+100] bottom-0 w-full right-0 lg:static lg:w-auto lg:bottom-auto lg:top-0",
          isOpen ? "inset-0 bg-black/40 " : ""
        )}
      >
        <div
          className={twMerge(
            "bg-white p-4 w-full lg:p-0",
            isOpen ? "rounded-t-md" : ""
          )}
        >
          <div
            className={twMerge(
              "",
              isOpen
                ? "h-auto overflow-visible mb-4"
                : "h-0 lg:h-auto overflow-hidden lg:overflow-visible lg:mb-4"
            )}
          >
            {/* 헤더 */}
            <h3 className="text-lg font-semibold pb-2 lg:hidden">
              {product.productName}
            </h3>
            <SelectedCart
              product={product}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              baseQuantity={baseQuantity}
              setBaseQuantity={setBaseQuantity}
            />
          </div>
          {/* 버튼 그룹 */}
          <div className="flex gap-2">
            <Button
              className="w-full"
              onClick={() => {
                if (!isOpen && window.innerWidth < 896) {
                  setIsOpen(true);
                  return;
                }
                handleAddToCart(() => setIsOpen(false));
              }}
            >
              장바구니 담기
            </Button>
            <Button
              className="w-full"
              variant="primary"
              onClick={() => {
                if (!isOpen && window.innerWidth < 896) {
                  setIsOpen(true);
                  return;
                }
                handleBuyNow(() => setIsOpen(false));
              }}
            >
              바로 구매
            </Button>
          </div>
      </div>
    </div>
  );
};

export default CartSidebar;
