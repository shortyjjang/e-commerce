"use client";

import { getProductDetail, ProductDetailType } from "@/query/getProductDetai";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function ProductDetail({
  initialProduct,
}: {
  initialProduct: ProductDetailType;
}) {
  const { data: productDetail } = useQuery({
    queryKey: ["productDetail", initialProduct.productId],
    queryFn: () => getProductDetail(initialProduct.productId),
    initialData: initialProduct,
    staleTime: 1000 * 60 * 10, // 10분간 캐시 유지 (상품상세는 자주 변경되지 않음)
  });
  return <div>{productDetail?.productName}</div>;
}
