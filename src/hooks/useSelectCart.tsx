"use client";
import { ProductListType } from "@/query/getProductLists";
import { useRef, useState } from "react";
import { CartItemOptions, useCart } from "@/layout/LayoutProvider";
import { useRouter } from "next/navigation";


export default function useSelectCart(product: ProductListType) {
  const callback = useRef<() => void>(() => {});
  const [selectedOptions, setSelectedOptions] = useState<CartItemOptions[]>([]);

  const { cart, setCart, setPaymentItems } = useCart();
  const router = useRouter();
  // ✅ 옵션이 없는 경우 기본 상품 수량
  const [baseQuantity, setBaseQuantity] = useState(product.minCount || 1);

  // ✅ 장바구니 담기 / 바로 구매하기 핸들러
  const handleAddToCart = (callback?: () => void) => {
    if (
      (product.optionGroups || []).length > 0 &&
      (selectedOptions || []).length === 0
    ) {
      alert("옵션을 선택해주세요.");
      return;
    }
    if (cart.some((item) => item.productId === product.productId)) {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === product.productId
            ? {
                ...item,
                quantity:
                  product.optionGroups.length === 0
                    ? item.quantity + baseQuantity
                    : item.quantity +
                      selectedOptions.reduce((acc, option) => acc + option.quantity, 0),
                options: product.optionGroups.length === 0 ? [] : [
                  ...item.options.map((option) =>
                    selectedOptions.some(
                      (opt) => opt.option.optionId === option.option.optionId
                    )
                      ? {
                          ...option,
                          quantity: option.quantity + (selectedOptions.find(
                            (opt) => opt.option.optionId === option.option.optionId
                          )?.quantity || 0),
                        }
                      : option
                  ),
                  ...selectedOptions.filter(
                    (opt) =>
                      !item.options.some(
                        (option) => option.option.optionId === opt.option.optionId
                      )
                  ),
                ],
              }
            : item
        )
      );
    } else {
      const newItem = {
        productId: product.productId,
        listImageUrl: product.listImageUrl,
        productName: product.productName,
        discountRate: product.discountRate,
        salePrice: product.salePrice,
        netPrice: product.netPrice,
        deliveryFee: product.deliveryFee,
        deliveryFeeType: product.deliveryFeeType,
        quantity:
          product.optionGroups.length === 0
            ? baseQuantity
            : selectedOptions.reduce((acc, option) => acc + option.quantity, 0),
        options: product.optionGroups.length === 0 ? [] : selectedOptions,
      };
      setCart((prev) => [...prev, newItem]);
    }
    callback?.();
  };

  const handleBuyNow = (callback?: () => void) => {
    if (
      (product.optionGroups || []).length > 0 &&
      (selectedOptions || []).length === 0
    ) {
      alert("옵션을 선택해주세요.");
      return;
    }
    setPaymentItems([{
        productId: product.productId,
        listImageUrl: product.listImageUrl,
        productName: product.productName,
        discountRate: product.discountRate,
        salePrice: product.salePrice,
        netPrice: product.netPrice,
      deliveryFee: product.deliveryFee,
      deliveryFeeType: product.deliveryFeeType,
      quantity:
        product.optionGroups.length === 0
          ? baseQuantity
          : selectedOptions.reduce((acc, option) => acc + option.quantity, 0),
      options: product.optionGroups.length === 0 ? [] : selectedOptions,
    }]);
    router.push("/order");
    callback?.();
  };
  return {
    selectedOptions,
    setSelectedOptions,
    handleAddToCart,
    handleBuyNow,
    baseQuantity,
    setBaseQuantity,
    callback,
  };
}
