import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
const ProductTab = forwardRef<
  HTMLDivElement,
  { setActiveTab: (tab: string) => void; reviewCount: number, className?: string, activeTab: string }
>(({ setActiveTab, reviewCount, className ,activeTab}, ref) => {
  return (
    <div className={className} ref={ref}>
      <div className="flex max-w-screen-lg w-screen lg:w-full lg:mx-auto bg-white">
        <ProductTabButton onClick={() => setActiveTab("상세정보")} active={activeTab === "상세정보"}>
          상세정보
        </ProductTabButton>
      <ProductTabButton onClick={() => setActiveTab("리뷰")} active={activeTab === "리뷰"}  >
        리뷰({(reviewCount || 0).toLocaleString()})
      </ProductTabButton>
      <ProductTabButton onClick={() => setActiveTab("Q&A")} active={activeTab === "Q&A"}>
        Q&A
      </ProductTabButton>
        <ProductTabButton onClick={() => setActiveTab("배송안내")} active={activeTab === "배송안내"}>
        배송안내
      </ProductTabButton>
    </div>
    </div>
  );
});

export function ProductTabButton({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) {
  return <button onClick={onClick} className={twMerge("w-full p-3 border-b-2 border-gray-200", active && "text-black font-bold border-black")}>{children}</button>;
}

ProductTab.displayName = "ProductTab";

export default ProductTab;
