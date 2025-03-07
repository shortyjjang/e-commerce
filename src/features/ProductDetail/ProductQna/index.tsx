"use client";
import MoreSpinner from "@/etities/MoreSpinner";
import useInfiniteList from "@/hooks/useInfiniteList";
import { getProductReview } from "@/query/getProductReview";
import React, { useMemo } from "react";

export default function ProductQna({
  initialProductQna,
  productId,
}: {
  initialProductQna: {
    items: any[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  productId: number;
}) {
  // useInfiniteList 훅 사용
  const { isFetchingNextPage, data, observerTarget } = useInfiniteList({
    queryKey: ["productList", productId],
    queryFn: (page: number) => getProductReview(page, productId),
    initialData: {
      pages: [initialProductQna],
      pageParams: [0],
    },
  });
  // 상품 목록을 useMemo로 메모이제이션하여 불필요한 계산 방지
  const qnaItems = useMemo(() => {
    if (!data) return null;

    return (data.pages || []).flatMap((page) =>
      (page.items || []).map((qna: any) => (
        <div key={qna.qnaId}>
          <div>
            <div></div>
          </div>
        </div>
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
  if (!data) return null;
  return (
    <div>
      <ul className="grid sm:grid-cols-3 grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2 py-4">
        {qnaItems}
      </ul>
      {loadingOrEndMessage}
      <div ref={observerTarget} style={{ height: "1px" }} />
    </div>
  );
}
