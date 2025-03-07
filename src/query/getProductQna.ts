export const getProductQna = async ({page, productId, userId}: {page: number, productId?: number, userId?:string}) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/product/qna?page=${page}${productId ? `&productId=${productId}` : ''}${userId ? `&userId=${userId}` : ''}`);
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export interface ProductQnaType {
    qnaId: number;
    productId: number;
    userId: string;
    qnaTitle: string;
    qnaContent: string;
    qnaAnswer: string;
    qnaAnswerDate: string;
    qnaAnswerUserId: string;
    qnaAnswerUserName: string;
    qnaAnswerUserProfileImageUrl: string;
}

export interface ProductQnaResponse {
    items: ProductQnaType[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}