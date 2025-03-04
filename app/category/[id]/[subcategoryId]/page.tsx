"use client";
import CategorySidebar from "@/components/CategoriesComponents/CategorySidebar";
import ToTopButton from "@/components/SharedComponents/ToTopButton";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/SharedComponents/ProductCard";
import { useBannerImage } from "@/hooks/useBannerImage";
import { useSubCategoryData } from "@/hooks/useSubCategoryData";
import { useProducts } from "@/hooks/useProducts";
import ProductsSkeleton from "@/components/SharedComponents/ProductsSkeleton";

const SubCategoryPage = () => {
  const params = useParams();
  const categoryId = params.id as string;
  const subCategoryId = params.subcategoryId as string;

  // Fetch subcategory data (cached)
  const {
    subCategory,
    loading: subCategoryLoading,
    error: subCategoryError,
  } = useSubCategoryData(categoryId, subCategoryId);

  // Fetch banner images (cached)
  const {
    bannerImageUrl: mainBannerImageUrl,
    loading: mainBannerLoading,
    error: mainBannerError,
  } = useBannerImage(subCategory?.subCategoryMainBannerFileId);

  const {
    bannerImageUrl: mobileBannerImageUrl,
    loading: mobileBannerLoading,
    error: mobileBannerError,
  } = useBannerImage(subCategory?.subCategoryMobileBannerFileId);

  // Fetch products for the subcategory
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts(subCategoryId);

  // State to track screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle subcategory or banner fetch errors
  if (subCategoryError || mainBannerError || mobileBannerError) {
    return <div>Error: {subCategoryError || mainBannerError || mobileBannerError}</div>;
  }

  return (
    <div className="flex flex-col gap-10 mb-4 md:mb-0 md:gap-6 xlg:gap-9 max-w-[1920px] xlg:mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between w-full mt-4 md:mt-0">
        <div className="md:pt-6 px-4 flex items-center flex-wrap gap-2 lg:px-12">
          <p className="text-shadeBlack text-sm xlg:text-xl">Home</p>
          <Image
            src={"/cheveron-right.svg"}
            alt="cheveron"
            width={12}
            height={12}
            className="w-3 h-3 xlg:w-6 xlg:h-6"
          />
          <p className="text-shadeBlack text-sm text-nowrap xlg:text-xl">
            {subCategory ? (
              subCategory.categoryName
            ) : (
              <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            )}
          </p>
          <Image
            src={"/cheveron-right.svg"}
            alt="cheveron"
            width={12}
            height={12}
            className="w-3 h-3 xlg:w-6 xlg:h-6"
          />
          <p className="text-shadeGray text-sm flex items-center gap-2 xlg:text-xl">
            {subCategory ? (
              subCategory.subCategoryName
            ) : (
              <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            )}
          </p>
        </div>
        <button className="size-12 rounded-lg py-[10px] px-3 cursor-pointer lg:hidden">
          <Image src={"/categories/categorySidebar.svg"} alt="sidebar" width={24} height={24} />
        </button>
      </div>

      {/* Marketing Banner */}
      <div className="h-[323px] flex items-center justify-between overflow-hidden">
        {mainBannerLoading || mobileBannerLoading ? (
          // Show a skeleton placeholder while the banner is loading
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : (
          // Display the banner image only if the URL is valid
          <>
            {isMobile ? (
              mobileBannerImageUrl ? (
                <Image
                  src={mobileBannerImageUrl}
                  alt="subcategory banner"
                  width={1280}
                  height={323}
                  className="w-full h-full"
                  loading="lazy"
                />
              ) : null
            ) : mainBannerImageUrl ? (
              <Image
                src={mainBannerImageUrl}
                alt="subcategory banner"
                width={1280}
                height={323}
                className="w-full h-full"
                loading="lazy"
              />
            ) : null}
          </>
        )}
      </div>

      {/* Main Categories Sidebar and Content */}
      <div className="flex px-4 relative lg:mb-16 lg:gap-6 lg:px-[48.5px] xlg:mt-6 xlg:gap-12 xlg:px-[72.75px]">
        {/* Categories Sidebar */}
        <div className="sticky top-0 self-start">
          {subCategoryLoading ? (
            // Show a skeleton placeholder while the sidebar is loading
            <div className="w-64 h-[400px] bg-gray-200 animate-pulse rounded-lg" />
          ) : (
            // Display the sidebar once loaded
            <CategorySidebar />
          )}
        </div>
        {/* Subcategory Products Content */}
        <div className="pt-10 lg:px-2 lg:flex-1 xlg:pt-0">
          <div className="flex flex-col gap-4 xlg:gap-6">
            <p className="text-shadeBlack font-semibold text-[20px] xlg:font-medium xlg:text-[32px]">
              {subCategory?.subCategoryName}
            </p>
            {productsLoading ? (
              // Show skeleton placeholders while products are loading
              <ProductsSkeleton />
            ) : productsError ? (
              // Display an error message if products fail to load
              <p className="text-shadeGray text-sm">
                Unable to load products. Please try again later.
              </p>
            ) : products.length > 0 ? (
              // Display products grid
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                No products available in this subcategory.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Top Button */}
      <div className="hidden md:flex justify-end mb-6">
        <ToTopButton />
      </div>
    </div>
  );
};

export default SubCategoryPage;