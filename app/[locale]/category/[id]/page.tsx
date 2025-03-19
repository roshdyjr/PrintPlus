"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SubCategoryGrid from "@/components/CategoriesComponents/SubCategoryGrid";
import { useCategoryData } from "@/hooks/useCategoryData";
import { useSubCategories } from "@/hooks/useSubCategories";
import ProductsSkeleton from "@/components/SharedComponents/ProductsSkeleton";
import { useTranslations } from "next-intl";

const Page = () => {
  const pathname = usePathname();
  const categoryId = pathname.split("/")[3];
  const t = useTranslations("CategoriesList");

  // Fetch active category data (cached)
  const {
    activeCategory,
    loading: categoryLoading,
    error: categoryError,
  } = useCategoryData(categoryId);

  // Fetch subcategories for the active category
  const {
    subCategories,
    loading: subCategoriesLoading,
    error: subCategoriesError,
  } = useSubCategories(activeCategory?.categoryId);

  return (
    <>
      {/* Grid Content */}
      <div className="flex flex-col gap-10 xlg:gap-[60px]">
        {subCategoriesLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <ProductsSkeleton key={index} />
          ))
        ) : subCategoriesError ? (
          <p className="text-shadeGray text-sm">
            {t("subCategoriesError")}
          </p>
        ) : subCategories.length > 0 ? (
          subCategories.map((subCategory) => (
            <SubCategoryGrid
              key={subCategory.subCategoryId}
              subCategoryName={subCategory.subCategoryName}
              subCategoryId={subCategory.subCategoryId}
              categoryId={activeCategory?.categoryId ?? 0}
              products={subCategory.products}
            />
          ))
        ) : (
          <p className="text-shadeGray text-sm md:text-base xlg:text-2xl">
            {t("noSubCategories")}
          </p>
        )}
      </div>
    </>
  );
};

export default Page;