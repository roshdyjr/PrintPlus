import Link from "next/link";
import React from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import ProductCard from "../SharedComponents/ProductCard";
import { useLocale, useTranslations } from "next-intl";

interface Product {
  productId: number;
  name: string;
  mainFileId: number;
  firstPrice: number;
  firstQuantity: number;
}

interface SubCategoryGridProps {
  subCategoryName: string;
  subCategoryId: number; // Add subCategoryId to props
  categoryId: number; // Add categoryId to props
  products: Product[];
}

const SubCategoryGrid = ({
  subCategoryName,
  subCategoryId,
  categoryId,
  products,
}: SubCategoryGridProps) => {
  const locale = useLocale();
  const t = useTranslations("CategoriesList");

  return (
    <div className="flex flex-col gap-4 xlg:gap-6">
      <div className="flex items-center justify-between">
        <p className="text-shadeBlack font-semibold text-[20px] xlg:text-[32px]">
          {subCategoryName}
        </p>
        {/* Update the Link to navigate to the subcategory products page */}
        <Link
          href={`/category/${categoryId}/${subCategoryId}`} // Dynamic route
          className="flex items-center gap-2"
        >
          <p className="text-sm font-bold xlg:text-[21px]">{t("viewMore")}</p>
          {locale === "ar" ? <FaArrowLeftLong /> : <FaArrowRightLong />}
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xlg:gap-6">
        {/* ProductCard Component */}
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            id={product.productId}
            mainFileId={product.mainFileId}
            alt={product.name}
            newBadge={false}
            saleBadge={false}
            title={product.name}
            price={product.firstPrice.toString()}
          />
        ))}
      </div>
    </div>
  );
};

export default SubCategoryGrid;
