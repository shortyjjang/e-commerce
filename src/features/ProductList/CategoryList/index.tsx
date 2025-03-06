import React, { ReactNode, memo } from "react";
import { CategoryListType } from "@/query/getCategory";
import { twMerge } from "tailwind-merge";
// SVG 이미지 import
import SaleIcon from "@/assets/icons/IconSale";
import EcoIcon from "@/assets/icons/IconEco";
import BestIcon from "@/assets/icons/IconBest";
import QuickIcon from "@/assets/icons/IconRocket";
import PetIcon from "@/assets/icons/IconPet";
import SaladIcon from "@/assets/icons/IconSalad";
import JuiceIcon from "@/assets/icons/IconJuice";
import GroupIcon from "@/assets/icons/IconGroup";

type CategoryListProps = {
  categoryList?: CategoryListType[] | null;
  categoryId: number;
  setCategoryId: (categoryId: number) => void;
};

// ✅ React.memo 적용
// eslint-disable-next-line react/display-name
const CategoryList = memo(({ categoryList, categoryId, setCategoryId }: CategoryListProps) => {
  const getImageSrc = (imageIcon: string): ReactNode => {
    switch (imageIcon) {
      case "SALE":
        return <SaleIcon />;
      case "ECO":
        return <EcoIcon />;
      case "BEST":
        return <BestIcon />;
      case "QUICK":
        return <QuickIcon />;
      case "PET":
        return <PetIcon />;
      case "JUICE":
        return <JuiceIcon />;
      case "GROUP":
        return <GroupIcon />;
      default:
        return <SaladIcon />;
    }
  };

  if (!categoryList) return null;

  return (
    <ul className="sticky top-0 z-10 bg-white whitespace-nowrap overflow-x-auto -mx-4 w-screen p-4 text-center">
      {categoryList.map((category, index) => (
        <li key={category.categoryId} className={twMerge(
            "inline-flex flex-col items-center align-top",
            index > 0 ? "ml-2" : ""
          )}
        >
          <button
            className={twMerge(
              "flex items-center flex-col justify-center bg-white shadow-md rounded-md w-[50px] h-[50px] gap-1 text-xs cursor-pointer",
            category.categoryId === categoryId && "text-green-600 bg-green-50 font-bold"
          )}
          onClick={() => setCategoryId(category.categoryId)}
        >
          {getImageSrc(category.categoryImage)}
          {category.categoryName}
        </button></li>
      ))}
    </ul>
  );
});

export default CategoryList;