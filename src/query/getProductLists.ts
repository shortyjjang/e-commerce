const getProductLists = async (page: number, categoryId: number, keyword?: string): Promise<ProductListResponse | null> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/product/v1/display?categoryId=${categoryId}${keyword ? `&keyword=${keyword}` : ""}&page=${page}`, {
            cache: 'no-store'
        });
        const data = await res.json();
        return data;
    } catch (error) {
        if(process.env.NODE_ENV === "development") {
            console.error(error);
        }
        return null;
    }
}

export interface ProductListResponse {
    items: ProductListType[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

export interface ProductListType {
    productId: number,
    saleStatus: string,
    listImageUrl: string,
    productName: string,
    discountRate: number,
    salePrice: number,
    netPrice: number,
    productType: string[]
    minCount: number,
    maxCount?: number,
    optionGroups: OptionGroup[]
    deliveryFee: number
    deliveryFeeType: 'EACH' | 'ALL'
}

export interface OptionGroup {
    optionGroupId: number,
    optionGroupName: string,
    options: Option[]
}

export interface Option {
    optionId: number,
    optionName: string,
    optionPrice: number,
    soldOutYn: string
    minCount: number,
    maxCount?: number,
}

export {
    getProductLists
}