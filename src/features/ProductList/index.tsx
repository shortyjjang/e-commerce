"use client";
import { CategoryListType, getCategory } from "@/query/getCategory";
import { getProductLists, ProductListResponse, ProductListType } from "@/query/getProductLists";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import CategoryList from "./CategoryList";
import Search from "./Search";
import MoreSpinner from "@/etities/MoreSpinner";
import useInfiniteList from "@/hooks/useInfiniteList";
import ProductItem from "./ProductItem";
import CartButton from "@/widget/CartButton";

export default function ProductList({
  initialCategoryId,
  prefetchCategoryList,
  prefetchProductList
}: {
  initialCategoryId: number;
  prefetchCategoryList: CategoryListType[];
  prefetchProductList:ProductListResponse;
}) {
  const queryClient = useQueryClient();
  const [categoryId, setCategoryId] = useState<number>(initialCategoryId);
  const [keyword, setKeyword] = useState<string>("");
  const isInitialMount = useRef(true);
  
  // 카테고리 목록 쿼리
  const { data: categoryList } = useQuery<CategoryListType[] | null, Error>({
    queryKey: ["categoryList"],
    queryFn: getCategory,
    staleTime: 1000 * 60 * 10, // 10분간 캐시 유지 (카테고리는 자주 변경되지 않음)
    initialData: prefetchCategoryList
  });
  
  // useCallback으로 getProductLists 함수를 메모이제이션
  const fetchProducts = useCallback((pageParam: number) => 
    getProductLists(pageParam, categoryId, keyword),
  [categoryId, keyword]);
  
  // useInfiniteList 훅 사용
  const { isFetchingNextPage, data, observerTarget, refetch } = useInfiniteList({
    queryKey: ["productList", categoryId, keyword],
    queryFn: fetchProducts,
    initialData: {
      pages: [
        prefetchProductList
      ],
      pageParams: [0]
    }
  });

  // setCategoryId 함수를 메모이제이션하여 불필요한 재렌더링 방지
  const handleCategoryChange = useCallback((id: number) => {
    setCategoryId(id);
  }, []);
  
  // setKeyword 함수를 메모이제이션하여 불필요한 재렌더링 방지
  const handleKeywordChange = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  // 마운트 후 키워드나 카테고리 변경 시에만 데이터 리셋
  useEffect(() => {
    // 초기 마운트 시에는 prefetchProductList를 사용하므로 실행하지 않음
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    // 초기 마운트가 아닌 경우(키워드 또는 카테고리 변경 시)에만 실행
    queryClient.removeQueries({
      queryKey: ["productList", categoryId, keyword],
    });
    window.scrollTo(0, 0);
    refetch();
  }, [keyword, categoryId, refetch, queryClient]);

  // 상품 목록을 useMemo로 메모이제이션하여 불필요한 계산 방지
  const productItems = useMemo(() => {
    if (!data) return null;
    
    return data.pages.flatMap((page) =>
      page.items.map((product: ProductListType) => (
        <ProductItem key={product.productId} product={product} />
      ))
    );
  }, [data]);

  // 추가 로딩 상태나 끝 메시지 표시 로직 메모이제이션
  const loadingOrEndMessage = useMemo(() => {
    if (isFetchingNextPage) {
      return <MoreSpinner className="w-full h-4" />;
    }
    return (
      <div className="text-sm text-gray-400 py-4 text-center">
        더 이상 데이터가 없습니다.
      </div>
    );
  }, [isFetchingNextPage]);

  return (
    <div className="min-h-screen">
      <div className="flex sticky top-0 z-10 bg-white gap-2 p-4 items-center">
        <Search value={keyword} onChange={handleKeywordChange} />
        <CartButton />
      </div>
      <CategoryList
        categoryList={categoryList}
        categoryId={categoryId}
        setCategoryId={handleCategoryChange}
      />
      <div className="p-4 text-sm text-gray-400">
        <b className="font-bold text-black">{data?.pages[0].totalItems}개</b>의 상품이 있습니다.
      </div>
      <ul className="grid sm:grid-cols-3 grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2 p-4">
        {productItems}
      </ul>
      {loadingOrEndMessage}
      <div ref={observerTarget} style={{ height: "1px" }} />
    </div>
  );
}
