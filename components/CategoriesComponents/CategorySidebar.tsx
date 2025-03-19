"use client";

import Link from "next/link";
import React, { useState, memo } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import useFetchCategories from "@/hooks/useFetchCategories"; 
import { useTranslations } from "next-intl";

// Type definition for tracking expanded categories
type ExpandedCategories = { [key: string]: boolean };

// Memoized Sidebar Component for better performance
const CategorySidebar = memo(() => {
  const { categories, loading, error } = useFetchCategories();
  const [expandedCategories, setExpandedCategories] = useState<ExpandedCategories>({});
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("CategoriesList");

  if (loading) return <p>Loading...</p>; // Show loading message while data is being fetched
  if (error) return <p className="text-red-500">{error}</p>; // Display error message if fetching fails

  // Function to toggle category expansion state
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    // Sidebar container, hidden on small screens and displayed on large screens
    <div className="hidden w-[243px] pt-10 lg:flex flex-col gap-4">
      <p className="text-shadeBlack font-semibold text-[30px]">{t("products")}</p>
      
      {/* Category List */}
      <div className="flex flex-col">
        {categories.map((category) => (
          <div key={category.categoryId} className="border-b border-[#E7E6E6]">
            {/* Category Header */}
            <div className="w-full py-2 flex items-center justify-between">
              <Link
                href={`/category/${category.categoryId}`}
                className={`text-categoryLink font-medium text-[15px] flex-1 ${
                  pathname === `/category/${category.categoryId}` ? "text-shadeBlack font-bold" : ""
                }`}
              >
                {category.categoryName}
              </Link>

              {/* Toggle button for subcategories, shown only if the category has subcategories */}
              {category.subCategories.length > 0 && (
                <button onClick={() => toggleCategory(category.categoryName)} className="p-2">
                  {expandedCategories[category.categoryName] ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
                </button>
              )}
            </div>

            {/* Subcategory List with Expand/Collapse Animation */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: expandedCategories[category.categoryName] ? "500px" : "0px",
              }}
            >
              <div className="flex flex-col gap-[3px] pl-4 pb-2">
                {category.subCategories.map((subCategory) => (
                  <Link
                    href={`/category/${category.categoryId}/${subCategory.subCategoryId}`}
                    key={subCategory.subCategoryId}
                    className={`text-categoryLink text-[13px] ${
                      pathname === `/category/${category.categoryId}/${subCategory.subCategoryId}`
                        ? "text-shadeBlack font-bold"
                        : ""
                    }`}
                  >
                    {subCategory.subCategoryName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

CategorySidebar.displayName = "CategorySidebar"; // Setting display name for memoized component
export default CategorySidebar;
