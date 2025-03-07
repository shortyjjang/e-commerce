import { ProductListType } from '@/query/getProductLists';
import { useRef, useState } from 'react'
import { Option } from '@/query/getProductLists';

export interface SelectedOption {
  option: Option;
  quantity: number;
}

export default function useSelectCart(product: ProductListType) {
    const callback = useRef<() => void>(() => {});
    const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
    // ✅ 옵션이 없는 경우 기본 상품 수량
    const [baseQuantity, setBaseQuantity] = useState(product.minCount || 1);
    // ✅ 장바구니 담기 / 바로 구매하기 핸들러
    const handleAddToCart = (callback?: () => void) => {
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
      callback?.();
    };
  
    const handleBuyNow = (callback?: () => void) => {
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
  }
}
