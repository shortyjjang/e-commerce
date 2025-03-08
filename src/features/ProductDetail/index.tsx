"use client";
import { getProductDetail, ProductDetailType } from "@/query/getProductDetail";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CartSidebar from "./CartSidebar";
import ZommImage from "@/etities/ZoomImage";
import ProductReview from "./ProductReview";
import ProductQna from "./ProductQna";
import CartButton from "@/widget/CartButton";
import FixedBar from "@/widget/FixedBar";
import ProductTabButton from "@/widget/TabButton";
import IconShare from "@/assets/icons/IconShare";
import Score from "@/widget/Score";
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
  const [activeTab, setActiveTab] = useState<string>("상세정보");
  const { data: productDetail } = useQuery({
    queryKey: ["productDetail", initialProduct.productId],
    queryFn: () => getProductDetail(initialProduct.productId),
    initialData: initialProduct,
    staleTime: 1000 * 60 * 10, // 10분간 캐시 유지 (상품상세는 자주 변경되지 않음)
  });

  return (
    <>
      <div className="flex gap-2 px-4 py-2 justify-end w-max-screen-lg mx-auto">
        <button>
          <IconShare />
        </button>
        <CartButton />
      </div>
      <div className="md:grid md:grid-cols-[minmax(400px,40%)_auto] gap-6 md:pb-8">
        <div className="relative aspect-square rounded-md overflow-hidden bg-gray-50">
          <ZommImage
            src={productDetail.listImageUrl}
            alt={productDetail.productName}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2 p-4 md:p-0">
            <div className="flex items-center gap-2.5 text-gray-500">
              <div className="flex items-center gap-0.5">
                <Score score={productDetail.score} />
                {productDetail.score}
              </div>
              <span className="w-px h-3 bg-gray-500 mt-0.5"></span>
              <span>
                리뷰{" "}
                <span className="text-black underline">
                  {productDetail.reviewCount}
                </span>
                개
              </span>
            </div>
            <h1 className="text-xl font-bold">{productDetail.productName}</h1>
            <div className="text-xl ">
              {productDetail.discountRate > 0 && (
                <div className="text-gray-400  text-sm">
                  실제판매가:{" "}
                  <span className="line-through">
                    {productDetail.netPrice.toLocaleString()}원
                  </span>
                </div>
              )}
              {productDetail.discountRate > 0 && (
                <span className="text-red-500 font-bold mr-3">
                  {productDetail.discountRate}%
                </span>
              )}
              <span className="font-bold">
                {productDetail.salePrice.toLocaleString()}원
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {productDetail.deliveryFee === 0 ? (
                <span className="text-sm text-blue-500 font-bold">
                  무료배송
                </span>
              ) : (
                <span className="text-sm text-gray-500">
                  {productDetail.deliveryFee.toLocaleString()}원
                  {productDetail.deliveryFeeType === "EACH" && "(개별배송)"}
                </span>
              )}{" "}
              ・ 배송일은 최소 {productDetail.deliveryDuration} 예상
            </p>
          </div>
          <CartSidebar product={productDetail} />
        </div>
      </div>
      <FixedBar>
        <div className="flex">
          <ProductTabButton
            onClick={() => setActiveTab("상세정보")}
            active={activeTab === "상세정보"}
          >
            상세정보
          </ProductTabButton>
          <ProductTabButton
            onClick={() => setActiveTab("리뷰")}
            active={activeTab === "리뷰"}
          >
            리뷰({(productDetail.reviewCount || 0).toLocaleString()})
          </ProductTabButton>
          <ProductTabButton
            onClick={() => setActiveTab("Q&A")}
            active={activeTab === "Q&A"}
          >
            Q&A
          </ProductTabButton>
          <ProductTabButton
            onClick={() => setActiveTab("배송안내")}
            active={activeTab === "배송안내"}
          >
            배송안내
          </ProductTabButton>
        </div>
      </FixedBar>
      {activeTab === "상세정보" && (
        <div
          className="text-gray-500 whitespace-pre-wrap px-4 lg:px-0"
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
    </>
  );
}
