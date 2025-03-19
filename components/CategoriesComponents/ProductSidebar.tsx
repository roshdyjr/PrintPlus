"use client"; // Ensures this component runs on the client side

import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CustomButton from "../SharedComponents/CustomButton";
import useFetchCategories from "@/hooks/useFetchCategories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

// Define the prop type for the sidebar component
interface ProductSidebarProps {
  onClose: () => void; // Function to handle sidebar closing
}

export default function ProductSidebar({ onClose }: ProductSidebarProps) {
  // Fetch categories data using custom hook
  const { categories, loading, error } = useFetchCategories();

  const t = useTranslations("CategoriesList");
  const locale = useLocale();

  // State to track which category is expanded
  const [expanded, setExpanded] = useState<number | null>(0);

  // State to track the selected subcategory
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  // Get the current route pathname to apply active styles
  const pathname = usePathname();

  // Show loading state while data is being fetched
  if (loading) return <p>Loading...</p>;

  // Show error message if fetching fails
  if (error) return <p className="text-red-500">{error}</p>;

  // Function to toggle category expansion
  const handleExpand = (index: number) => {
    setExpanded((prev) => (prev === index ? null : index)); // Collapse if already expanded, otherwise expand
  };

  // Function to handle subcategory selection
  const handleSubCategoryClick = (
    categoryId: number,
    subCategoryId: number
  ) => {
    setSelectedSubCategory(`${categoryId}-${subCategoryId}`);
  };

  // Function to reset the selected category and redirect
  const handleReset = () => {
    setSelectedSubCategory(null);
    window.location.href = "/category/2"; // Redirect user to category 2
  };

  return (
    <div className="w-full py-5 ">
      {/* Header section with back button and reset */}
      <div className="flex justify-between items-center mb-4 px-6">
        <div className="flex items-center gap-4">
          {locale === "ar" ? (
            <FaArrowRight
              onClick={onClose}
              className="cursor-pointer text-lg"
            />
          ) : (
            <FaArrowLeft onClick={onClose} className="cursor-pointer text-lg" />
          )}

          <h2 className="font-semibold">{t("products")}</h2>
        </div>
        <button className="text-blue-500" onClick={handleReset}>
          {t("reset")}
        </button>
      </div>

      <hr />

      {/* Category list */}
      <div className="flex flex-col gap-2 px-1 mt-5">
        {categories.map((cat, index) => (
          <div
            key={cat.categoryId}
            className={`border-b-[1px] py-3 ${
              expanded === index ? "rounded-[0px]" : "rounded-[15px]"
            }`}
          >
            {/* Category button with expand/collapse toggle */}
            <button
              onClick={() => handleExpand(index)}
              className="w-full flex justify-between items-center px-5"
            >
              <Link
                href={`/category/${cat.categoryId}`}
                className={`text-categoryLink font-semibold text-[15px] ${
                  pathname === `/category/${cat.categoryId}`
                    ? "text-shadeBlack font-bold"
                    : ""
                }`}
              >
                <span>{cat.categoryName}</span>
              </Link>
              <span className="text-xl">
                {expanded === index ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </span>
            </button>

            {/* Subcategories list - Only visible when category is expanded */}
            {cat.subCategories.length > 0 && expanded === index && (
              <div className="pl-4 flex flex-col gap-1 mt-2">
                {cat.subCategories.map((sub) => {
                  const isActive =
                    selectedSubCategory ===
                      `${cat.categoryId}-${sub.subCategoryId}` ||
                    pathname ===
                      `/category/${cat.categoryId}/${sub.subCategoryId}`;

                  return (
                    <Link
                      key={sub.subCategoryId}
                      href={`/category/${cat.categoryId}/${sub.subCategoryId}`}
                      className={`text-sm p-2 flex items-center gap-2 ${
                        isActive ? "font-bold text-blue-500" : ""
                      }`}
                      onClick={() =>
                        handleSubCategoryClick(
                          cat.categoryId,
                          sub.subCategoryId
                        )
                      }
                    >
                      {isActive && <span className="text-blue-500">•</span>}
                      {sub.subCategoryName}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom section with button to close the sidebar */}
      <div className="mt-36 w-[314px] mx-auto">
        <CustomButton
          label={t("viewResults")}
          className=""
          type="submit"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
