import ProductDetail from '@/features/ProductDetail';
import { getProductDetail } from '@/query/getProductDetai';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import React from 'react'
import { Metadata } from 'next';

export async function generateMetadata({params}: {params: {id: string}}): Promise<Metadata> {
    const queryClient = new QueryClient();
    const productDetail = await queryClient.fetchQuery({
        queryKey: ["productDetail", params.id],
        queryFn: () => getProductDetail(Number(params.id)),
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
    const queryClient = new QueryClient();
    const productDetail = await queryClient.fetchQuery({
      queryKey: ["productDetail", params.id],
      queryFn: () => getProductDetail(Number(params.id)),
      staleTime: 1000 * 60 * 10, // 10분간 캐시 유지 (상품상세는 자주 변경되지 않음)
    });
    if (productDetail) {
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductDetail initialProduct={productDetail} />
            </HydrationBoundary>
        )
    }
    return notFound();
}
