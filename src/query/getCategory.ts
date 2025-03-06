const getCategory = async (): Promise<CategoryListType[] | null> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/category/v1/display`, {
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
};

export interface CategoryListType {
    categoryId: number;
    categoryName: string;
    categoryImage: string;
}


export {
    getCategory
}