import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // URL 파싱
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;

  try {
    // 경로에 맞게 수정 (/api/category/v1/display)
    if (pathname.includes("/api/category/v1/display")) {
      return new Response(
        JSON.stringify([
          {
            categoryId: 1,
            categoryName: "SALE",
            categoryImage: "SALE",
          },
          {
            categoryId: 2,
            categoryName: "친환경",
            categoryImage: "ECO",
          },
          {
            categoryId: 3,
            categoryName: "베스트",
            categoryImage: "BEST",
          },
          {
            categoryId: 4,
            categoryName: "빠른 배송",
            categoryImage: "QUICK",
          },
          {
            categoryId: 5,
            categoryName: "반려동물",
            categoryImage: "PET",
          },
          {
            categoryId: 6,
            categoryName: "샐러드",
            categoryImage: "SALAD",
          },
          {
            categoryId: 7,
            categoryName: "주스",
            categoryImage: "JUICE",
          },
          {
            categoryId: 8,
            categoryName: "공동구매",
            categoryImage: "GROUP",
          },
        ]),
        {
          status: 200,
          headers: { "Content-type": "application/json" },
        }
      );
    }
    // 상품 목록 API (/api/product/v1/display)
    else if (pathname.includes("/api/product/v1/display")) {
      const categoryId = searchParams.get("categoryId");
      return new Response(
        JSON.stringify({
          items: [
            {
              productId: 1,
              saleStatus: "ON_SALE",
              listImageUrl: "https://via.placeholder.com/150",
              productName: categoryId + "상품 이름",
              discountRate: 0,
              salePrice: 10000,
              netPrice: 10000,
              productType: ["친환경", "못난이", "한정수량"],
              deliveryFee: 3000,
              deliveryFeeType: "ALL",
            },
            {
              productId: 2,
              saleStatus: "ON_SALE",
              listImageUrl: "https://via.placeholder.com/150",
              productName: categoryId + "상품 이름",
              discountRate: 10,
              salePrice: 9000,
              netPrice: 10000,
              productType: ["못난이"],
              deliveryFee: 0,
              deliveryFeeType: "ALL",
              optionGroups: [
                {
                  optionGroupId: 1,
                  optionGroupName: "옵션 그룹 이름",
                  options: [
                    {
                      optionId: 1,
                      optionName: "옵션 이름3",
                      optionPrice: 9000,
                      soldOutYn: "Y",
                    },
                    {
                      optionId: 2,
                      optionName: "옵션 이름3",
                      optionPrice: 10000,
                      soldOutYn: "N",
                    },
                    {
                      optionId: 3,
                      optionName: "옵션 이름2",
                      optionPrice: 11000,
                      soldOutYn: "N",
                    },
                  ],
                },
              ],
            },
            {
              productId: 3,
              saleStatus: "ON_SALE",
              listImageUrl: "https://via.placeholder.com/150",
              productName: categoryId + "상품 이름",
              discountRate: 0,
              salePrice: 10000,
              netPrice: 10000,
              deliveryFee: 3000,
              deliveryFeeType: "ALL",
              productType: ["친환경", "못난이", "한정수량"],
            },
            {
              productId: 4,
              saleStatus: "ON_SALE",
              listImageUrl: "https://via.placeholder.com/150",
              productName: categoryId + "상품 이름",
              discountRate: 10,
              salePrice: 9000,
              netPrice: 10000,
              productType: ["못난이"],
              deliveryFee: 0,
              deliveryFeeType: "ALL",
              optionGroups: [
                {
                  optionGroupId: 1,
                  optionGroupName: "옵션 그룹 이름",
                  options: [
                    {
                      optionId: 1,
                      optionName: "옵션 이름3",
                      optionPrice: 9000,
                      soldOutYn: "Y",
                    },
                    {
                      optionId: 2,
                      optionName: "옵션 이름3",
                      optionPrice: 10000,
                      soldOutYn: "N",
                    },
                    {
                      optionId: 3,
                      optionName: "옵션 이름2",
                      optionPrice: 11000,
                      soldOutYn: "N",
                    },
                  ],
                },
              ],
            },
            {
              productId: 5,
              saleStatus: "ON_SALE",
              listImageUrl: "https://via.placeholder.com/150",
              productName: categoryId + "상품 이름",
              discountRate: 0,
              salePrice: 10000,
              netPrice: 10000,
              productType: ["친환경", "못난이", "한정수량"],
              deliveryFee: 3000,
              deliveryFeeType: "ALL",
            },
            {
              productId: 6,
              saleStatus: "ON_SALE",
              listImageUrl: "https://via.placeholder.com/150",
              productName: categoryId + "상품 이름",
              discountRate: 10,
              salePrice: 9000,
              netPrice: 10000,
              productType: ["못난이"],
              deliveryFee: 1000,
              deliveryFeeType: "EACH",
              optionGroups: [
                {
                  optionGroupId: 1,
                  optionGroupName: "옵션 그룹 이름",
                  options: [
                    {
                      optionId: 1,
                      optionName: "옵션 이름3",
                      optionPrice: 9000,
                      soldOutYn: "Y",
                    },
                    {
                      optionId: 2,
                      optionName: "옵션 이름3",
                      optionPrice: 10000,
                      soldOutYn: "N",
                    },
                    {
                      optionId: 3,
                      optionName: "옵션 이름2",
                      optionPrice: 11000,
                      soldOutYn: "N",
                    },
                  ],
                },
              ],
            },
          ],
          currentPage: 1,
          totalPages: 1,
          totalItems: 6,
        }),
        {
          status: 200,
          headers: { "Content-type": "application/json" },
        }
      );
    }
    // 상품 상세 API (/api/product/v1/detail)
    else if (pathname.includes("/api/product/v1/detail")) {
      const productId = searchParams.get("productId");
      return new Response(
        JSON.stringify(
          {
            productId: productId,
            saleStatus: "ON_SALE",
            listImageUrl: "https://via.placeholder.com/150",
            productName: "상품 이름",
            discountRate: 10,
            salePrice: 9000,
            netPrice: 10000,
            productType: ["못난이"],
            deliveryFee: 0,
            deliveryFeeType: "ALL",
            optionGroups: [
              {
                optionGroupId: 1,
                optionGroupName: "옵션 그룹 이름",
                options: [
                  {
                    optionId: 1,
                    optionName: "옵션 이름3",
                    optionPrice: 9000,
                    soldOutYn: "Y",
                  },
                  {
                    optionId: 2,
                    optionName: "옵션 이름3",
                    optionPrice: 10000,
                    soldOutYn: "N",
                  },
                  {
                    optionId: 3,
                    optionName: "옵션 이름2",
                    optionPrice: 11000,
                    soldOutYn: "N",
                  },
                ],
              },
            ],
          }),
        {
          status: 200,
          headers: { "Content-type": "application/json" },
        }
      );
    }

    // 경로를 찾을 수 없음
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-type": "application/json" },
    });
  } catch (error) {
    console.error("API 오류:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-type": "application/json" },
    });
  }
}
