"use client";

import { getProductDetail, ProductDetailType } from "@/query/getProductDetail";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import CartSidebar from "./CartSidebar";
import ZommImage from "@/etities/ZoomImage";
import ProductTab from "./ProductTab";
import ProductReview from "./ProductReview";
import ProductQna from "./ProductQna";
export default function ProductDetail({
  initialProduct,
  initialProductReview,
  initialProductQna,
}: {
  initialProduct: ProductDetailType;
  initialProductReview: {
    items: any[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  initialProductQna: {
    items: any[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}) {
  const detailTabRef = useRef<HTMLDivElement>(null);
  const [isFixedTab, setIsFixedTab] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("상세정보");
  const { data: productDetail } = useQuery({
    queryKey: ["productDetail", initialProduct.productId],
    queryFn: () => getProductDetail(initialProduct.productId),
    initialData: initialProduct,
    staleTime: 1000 * 60 * 10, // 10분간 캐시 유지 (상품상세는 자주 변경되지 않음)
  });
  useEffect(() => {
    const handleScroll = () => {
      const detailTab = detailTabRef.current;
      if (!detailTab) return;
      const detailTabOffsetTop = detailTab.getBoundingClientRect().top;
      setIsFixedTab(detailTabOffsetTop < window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col gap-4 pt-4 pb-20 lg:pb-4">
      <div className="lg:grid lg:grid-cols-[minmax(400px,40%)_auto] gap-6">
        <div className="relative aspect-square rounded-md overflow-hidden bg-gray-50 w-screen -mx-4 lg:mx-0 lg:w-full">
          <ZommImage
            src={productDetail.listImageUrl}
            alt={productDetail.productName}
          />
        </div>
        <div className="flex flex-col mt-4 lg:mt-0">
          <h1 className="text-xl font-bold pb-1">
            {productDetail.productName}
          </h1>
          <div className="flex items-center gap-2 text-gray-500">
            <div>
              <span className="relative text-gray-200 text-lg">
                ★★★★★
                <span
                  className="absolute top-0 left-0 h-full text-yellow-500 overflow-hidden"
                  style={{
                    width: `${productDetail.score * 20}%`,
                  }}
                >
                  ★★★★★
                </span>
              </span>
              {productDetail.score}
            </div>
            <span className="w-px h-3 bg-gray-500 mt-0.5"></span>
            <span>리뷰 {productDetail.reviewCount}개</span>
          </div>
          {productDetail.deliveryFee === 0 ? (
            <div className="text-sm text-blue-500 font-bold text-right">
              무료배송
            </div>
          ) : (
            <div className="text-sm text-gray-500 text-right">
              {productDetail.deliveryFee.toLocaleString()}원
            </div>
          )}
          <div className="flex items-center gap-1 justify-between text-xl pb-4">
            {productDetail.discountRate > 0 && (
              <span className="text-red-500 font-bold">
                {productDetail.discountRate}%
              </span>
            )}
            <div className="flex items-end gap-2">
              {productDetail.discountRate > 0 && (
                <span className="text-gray-400 line-through text-base">
                  {productDetail.netPrice.toLocaleString()}원
                </span>
              )}
              <span className="font-bold">
                {productDetail.salePrice.toLocaleString()}원
              </span>
            </div>
          </div>
          <CartSidebar product={productDetail} />
        </div>
      </div>
      <ProductTab
        setActiveTab={setActiveTab}
        reviewCount={productDetail.reviewCount}
        ref={detailTabRef}
        activeTab={activeTab}
        className="-mx-4"
      />
      {activeTab === "상세정보" && (
        <div
          className="text-gray-500 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: productDetail.productDetail }}
        />
      )}
      {activeTab === "리뷰" && (
        <ProductReview
          initialProductReview={initialProductReview}
          productId={productDetail.productId}
        />
      )}
      {activeTab === "Q&A" && (
        <ProductQna
          initialProductQna={initialProductQna}
          productId={productDetail.productId}
        />
      )}
      <ProductTab
        setActiveTab={setActiveTab}
        reviewCount={productDetail.reviewCount}
        activeTab={activeTab}
        className={isFixedTab ? "fixed top-0 left-0 w-full z-[10]" : "hidden"}
      />
    </div>
  );
}
