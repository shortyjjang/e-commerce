export const getProductReview = async (page: number, productId: number) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/product/review?page=${page}&productId=${productId}`);
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export interface ProductReviewType {
  reviewId: number;
  productId: number;
  userId: string;
  reviewTitle: string;
  reviewContent: string;
}

export interface ProductReviewResponse {
  items: ProductReviewType[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
