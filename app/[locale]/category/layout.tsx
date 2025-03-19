"use client";

import CategorySidebar from "@/components/CategoriesComponents/CategorySidebar";
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useCategoryData } from "@/hooks/useCategoryData";
import { useBannerImage } from "@/hooks/useBannerImage";
import { useSubCategoryData } from "@/hooks/useSubCategoryData";
import ToTopButton from "@/components/SharedComponents/ToTopButton";
import ContainerProductSidebar from "@/components/CategoriesComponents/ContainerProductSidebar";
import { useLocale, useTranslations } from "next-intl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CategoryLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const categoryId = segments[3];
  const subCategoryId = segments[4];
  const locale = useLocale();
  const t = useTranslations("CategoriesList");

  // Fetch active category data (cached)
  const {
    activeCategory,
    loading: categoryLoading,
    error: categoryError,
  } = useCategoryData(categoryId);

  // Fetch active subcategory data (cached)
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
  } = useBannerImage(
    subCategory
      ? subCategory.subCategoryMainBannerFileId
      : activeCategory?.categoryMainBannerFileId
  );

  const {
    bannerImageUrl: mobileBannerImageUrl,
    loading: mobileBannerLoading,
    error: mobileBannerError,
  } = useBannerImage(
    subCategory
      ? subCategory.subCategoryMobileBannerFileId
      : activeCategory?.categoryMobileBannerFileId
  );

  // State to track screen size
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle category or banner fetch errors
  if (
    categoryError ||
    mainBannerError ||
    mobileBannerError ||
    subCategoryError
  ) {
    return (
      <div>
        Error:{" "}
        {categoryError ||
          mainBannerError ||
          mobileBannerError ||
          subCategoryError}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mb-4 md:mb-0 md:gap-6 xlg:gap-9 max-w-[1920px] xlg:mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between w-full mt-4 lg:mt-0">
        <div className="px-4 flex items-center gap-2 lg:px-12 lg:pt-6">
          <p className="text-shadeBlack text-sm xlg:text-xl">{t("home")}</p>
          {locale === "ar" ? (
            <FaChevronLeft className="w-3 h-3 xlg:w-6 xlg:h-6" />
          ) : (
            <FaChevronRight className="w-3 h-3 xlg:w-6 xlg:h-6" />
          )}

          <p className="text-shadeGray text-sm flex items-center gap-2 xlg:text-xl">
            {activeCategory ? (
              activeCategory.categoryName
            ) : (
              <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            )}
          </p>
          {subCategory && subCategoryId && (
            <>
              {locale === "ar" ? (
                <FaChevronLeft className="w-3 h-3 xlg:w-6 xlg:h-6" />
              ) : (
                <FaChevronRight className="w-3 h-3 xlg:w-6 xlg:h-6" />
              )}
              <p className="text-shadeGray text-sm flex items-center gap-2 xlg:text-xl">
                {subCategory.subCategoryName}
              </p>
            </>
          )}
        </div>
        <button
          className="size-[48px] flex items-center justify-center lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Image
            src={"/categories/categorySidebar.svg"}
            alt="sidebar"
            width={24}
            height={24}
          />
        </button>
      </div>
      <ContainerProductSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Marketing Banner */}
      <div className="h-[323px] flex items-center justify-between overflow-hidden xlg:h-[351px]">
        {mainBannerLoading || mobileBannerLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : (
          <>
            {isMobile ? (
              mobileBannerImageUrl ? (
                <Image
                  src={mobileBannerImageUrl}
                  alt="category banner"
                  width={1280}
                  height={323}
                  className="w-full h-full"
                  loading="lazy"
                />
              ) : null
            ) : mainBannerImageUrl ? (
              <Image
                src={mainBannerImageUrl}
                alt="category banner"
                width={1280}
                height={323}
                className="w-full h-full"
                loading="lazy"
              />
            ) : null}
          </>
        )}
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex relative px-4 mt-[36px] md:mt-0 lg:gap-6 lg:mb-16 lg:px-[48.5px] w-full xlg:mt-6 xlg:gap-12 xlg:px-[72.75px]">
        {/* Sidebar */}
        <div className="sticky top-0 self-start">
          <CategorySidebar />
        </div>

        {/* Main Content (Grid) */}
        <div className="flex-1 px-0 w-full md:pt-10 md:w-fit md:px-2 xlg:pt-0">
          {children}
        </div>
      </div>

      {/* Scroll Top Button */}
      <div className="hidden md:flex justify-end mb-6">
        <ToTopButton />
      </div>
    </div>
  );
}
