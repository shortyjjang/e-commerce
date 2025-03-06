import { ProductListType } from "./getProductLists";

export const getProductDetail = async (id: number) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/product/v1/detail?productId=${id}`);
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export interface ProductDetailType extends ProductListType {
    productDescription: string;
    productDetail: string;
}