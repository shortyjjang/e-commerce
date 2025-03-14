import { ProductListType } from "@/query/getProductLists";
import React, { useState, useMemo, useCallback, memo } from "react";
import LazyImage from "@/etities/LazyImage";
import IconCart from "@/assets/icons/IconCart";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import CartOverlay from "../CartOverlay";

// React.memo로 감싸서 불필요한 리렌더링 방지
const ProductItem = memo(({ product }: { product: ProductListType }) => {
  const router = useRouter();
  const [isOpenCart, setIsOpenCart] = useState(false);

  // 카트 열기/닫기 함수 메모이제이션
  const handleCartToggle = useCallback(() => {
    setIsOpenCart((prev) => !prev);
  }, []);

  // 제품 유형 태그 메모이제이션
  const productTypeTags = useMemo(() => {
    if (!product.productType || product.productType.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1 mb-1">
        {product.productType.map((type) => (
          <span
            key={type}
            className={twMerge(
              "text-xs text-gray-400 rounded-xs px-1 py-0.5",
              type === "한정수량"
                ? "bg-green-500 text-white"
                : "border border-gray-400"
            )}
          >
            {type}
          </span>
        ))}
      </div>
    );
  }, [product.productType]);

  return (
    <li>
      <div
        className="relative w-full aspect-square rounded-md overflow-hidden bg-gray-50 mb-2"
        onClick={() => {
          router.push(`/${product.productId}`);
        }}
      >
        <LazyImage
          src={product.listImageUrl}
          alt={product.productName}
          fill
          priority={true}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCartToggle();
          }}
          className="absolute bottom-2 right-2 aspect-square rounded-full bg-black/30 border border-white p-2 text-white cursor-pointer"
        >
          <IconCart />
        </button>
      </div>
      {productTypeTags}
      <h3 className="text-md font-normal mb-1">{product.productName}</h3>
      {product.discountRate > 0 && (
        <div className="text-gray-400 line-through text-sm">
          {product.netPrice.toLocaleString()}원
        </div>
      )}
      <div className="flex items-center gap-2">
        {product.discountRate > 0 && (
          <span className="text-red-500 font-bold">
            {product.discountRate}%
          </span>
        )}
        <span className="font-bold">
          {product.salePrice.toLocaleString()}원
        </span>
      </div>
      {product.deliveryFee === 0 && (
        <span className="inline-block align-top mt-2 text-xs px-1 py-0.5 bg-gray-100 rounded-sm text-gray-500">
          무료배송
        </span>
      )}
      {isOpenCart && (
        <CartOverlay product={product} onClose={handleCartToggle} />
      )}
    </li>
  );
});

// 표시 이름 설정
ProductItem.displayName = "ProductItem";

export default ProductItem;
