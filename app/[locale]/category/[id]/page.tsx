"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SubCategoryGrid from "@/components/CategoriesComponents/SubCategoryGrid";
import { useCategoryData } from "@/hooks/useCategoryData";
import { useSubCategories } from "@/hooks/useSubCategories";
import ProductsSkeleton from "@/components/SharedComponents/ProductsSkeleton";

const Page = () => {
  const pathname = usePathname();
  const categoryId = pathname.split("/")[3];

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
            Unable to load subcategories. Please try again later.
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
            No subcategories available in this category.
          </p>
        )}
      </div>
    </>
  );
};

export default Page;