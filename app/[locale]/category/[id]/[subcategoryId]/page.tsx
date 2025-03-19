"use client";

import ToTopButton from "@/components/SharedComponents/ToTopButton";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/SharedComponents/ProductCard";
import { useSubCategoryData } from "@/hooks/useSubCategoryData";
import { useProducts } from "@/hooks/useProducts";
import ProductsSkeleton from "@/components/SharedComponents/ProductsSkeleton";
import { useTranslations } from "use-intl";

const SubCategoryPage = () => {
  const params = useParams();
  const categoryId = params.id as string;
  const subCategoryId = params.subcategoryId as string;
  const t = useTranslations("CategoriesList")

  // Fetch subcategory data (cached)
  const {
    subCategory,
    loading: subCategoryLoading,
    error: subCategoryError,
  } = useSubCategoryData(categoryId, subCategoryId);

  // Fetch products for the subcategory
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts(subCategoryId);

  // Handle subcategory or products fetch errors
  if (subCategoryError || productsError) {
    return <div>Error: {subCategoryError || productsError}</div>;
  }

  return (
    <>
      {/* Products Grid */}
      <div className="flex flex-col gap-4 xlg:gap-6">
        <p className="text-shadeBlack font-semibold text-[20px] xlg:font-medium xlg:text-[32px]">
          {subCategory?.subCategoryName}
        </p>
        {productsLoading ? (
          // Show skeleton placeholders while products are loading
          <ProductsSkeleton />
        ) : products.length > 0 ? (
          // Display products grid
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xlg:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.productId}
                mainFileId={product.mainFileId}
                alt={product.name}
                title={product.name}
                price={product.firstPrice.toString()}
              />
            ))}
          </div>
        ) : (
          // Display a message if no products are available
          <p className="text-shadeGray text-sm xlg:text-2xl">
            {t("noProducts")}
          </p>
        )}
      </div>
    </>
  );
};

export default SubCategoryPage;