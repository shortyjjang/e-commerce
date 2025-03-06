import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef, useMemo, useLayoutEffect } from "react";
import { ProductListResponse } from "@/query/getProductLists";

export default function useInfiniteList({
  queryKey,
  queryFn,
  enabled = true,
  staleTime = 1000 * 60 * 5, // 5분 동안 데이터 유지
  initialData
}: {
  queryKey: any[];
  queryFn: (pageParam: number) => Promise<ProductListResponse | null>;
  enabled?: boolean;
  staleTime?: number;
  initialData?: {
    pages: {
      items: any[];
      currentPage: number;
      totalPages: number;
      totalItems: number;
    }[];
    pageParams: number[];
  };
}) {
  const observerTarget = useRef<HTMLDivElement | null>(null);
  
  // useMemo를 사용하여 queryKey가 변경될 때만 쿼리 옵션을 다시 계산
  const queryOptions = useMemo(() => ({
    queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const result = await queryFn(pageParam);
      // null을 빈 결과로 처리하여 타입 안전성 보장
      if (result === null) {
        return {
          items: [],
          currentPage: 0,
          totalPages: 0,
          totalItems: 0
        } as ProductListResponse;
      }
      return result;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: ProductListResponse) =>
      lastPage.totalPages > lastPage.currentPage
        ? lastPage.currentPage + 1
        : undefined,
    staleTime: staleTime,
    enabled,
    initialData: initialData
  }), [queryKey, queryFn, enabled, staleTime, initialData]);
  
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isFetching, 
    refetch 
  } = useInfiniteQuery(queryOptions);

  // useCallback으로 메모이제이션하여 불필요한 재생성 방지
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  // useLayoutEffect를 사용하여 레이아웃 계산 전에 IntersectionObserver를 설정
  // 이렇게 하면 화면 깜빡임 없이 observer를 설정할 수 있음
  useLayoutEffect(() => {
    if (!observerTarget.current) return;
    
    const element = observerTarget.current;
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [observerCallback]);

  // 인터페이스 데이터를 useMemo로 메모이제이션
  const result = useMemo(() => ({
    isFetching,
    isFetchingNextPage,
    data,
    observerTarget,
    refetch,
    hasNextPage,
  }), [isFetching, isFetchingNextPage, data, refetch, hasNextPage]);
  
  return result;
}
