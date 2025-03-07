import ProductDetail from '@/features/ProductDetail';
import { getProductDetail } from '@/query/getProductDetail';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import React from 'react'
import { Metadata } from 'next';
import { getProductReview } from '@/query/getProductReview';
import { getProductQna } from '@/query/getProductQna';

export async function generateMetadata({params}: {params: {id: string}}): Promise<Metadata> {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const queryClient = new QueryClient();
    const productDetail = await queryClient.fetchQuery({
        queryKey: ["productDetail", id],
        queryFn: () => getProductDetail(Number(id)),
    });
    if (productDetail) {
        return {
            title: productDetail.productName,
            description: productDetail.productDescription,
        };
    }
    return {};
}

export default async function ProductDetailPage({params}: {params: {id: string}}) 
{
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const queryClient = new QueryClient();
    const productDetail = await queryClient.fetchQuery({
      queryKey: ["productDetail", id],
      queryFn: () => getProductDetail(Number(id)),
      staleTime: 1000 * 60 * 10, // 10분간 캐시 유지 (상품상세는 자주 변경되지 않음)
    });
    const productReview = await queryClient.fetchQuery({
      queryKey: ["productReview", id],
      queryFn: () => getProductReview(0, Number(id)),
    });
    const productQna = await queryClient.fetchQuery({
      queryKey: ["productQna", id],
      queryFn: () => getProductQna({
        page: 0,
        productId: Number(id),
      }),
    });
    if (productDetail) {
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductDetail initialProduct={productDetail} initialProductReview={productReview} initialProductQna={productQna} />
            </HydrationBoundary>
        )
    }
    return notFound();
}
