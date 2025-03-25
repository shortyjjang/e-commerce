import ProductList from "@/features/ProductList";
import { getCategory } from "@/query/getCategory";
import { getProductLists } from "@/query/getProductLists";
import { QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(): Promise<Metadata> {
  const queryClient = new QueryClient();
  const categoryList = await queryClient.fetchQuery({
    queryKey: ["categoryList"],
    queryFn: getCategory,
  });

  if (!categoryList || categoryList.length === 0) {
    return {};
  }

  return {
    title: `상품목록 - ${categoryList
      .map((category) => category.categoryName)
      .join(", ")}`,
    description: `다양한 상품을 확인하세요: ${categoryList
      .map((category) => category.categoryName)
      .join(", ")}`,
    keywords: categoryList.map((category) => category.categoryName).join(", "),
    openGraph: {
      title: `상품목록 - ${categoryList
        .map((category) => category.categoryName)
        .join(", ")}`,
      description: `다양한 상품을 확인하세요: ${categoryList
        .map((category) => category.categoryName)
        .join(", ")}`,
      type: "website",
    },
  };
}

export default async function Home({ searchParams }: Props) {
  const queryClient = new QueryClient();
  const categoryList = await queryClient.fetchQuery({
    queryKey: ["categoryList"],
    queryFn: getCategory,
  });

  if (!categoryList || categoryList.length === 0) {
    return notFound();
  }

  // URL에서 categoryId를 가져오거나 첫 번째 카테고리 ID를 사용
  const categoryId = searchParams.categoryId ? 
    Number(searchParams.categoryId) : 
    categoryList[0]?.categoryId;

  const productList = await queryClient.fetchQuery({
    queryKey: ["productList", categoryId],
    queryFn: () => getProductLists(0, categoryId),
  });

  if (productList) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList 
          initialCategoryId={categoryId} 
          prefetchCategoryList={categoryList} 
          prefetchProductList={productList} 
        />
      </HydrationBoundary>
    );
  }
  return notFound();
}
