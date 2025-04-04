import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

interface SubCategory {
  subCategoryId: number;
  subCategoryName: string;
  subCategoryMainBannerFileId: number;
  subCategoryMobileBannerFileId: number;
  categoryName: string;
}

export const useSubCategoryData = (
  categoryId: string | undefined,
  subCategoryId: string | undefined
) => {
  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale(); // Get the current locale

  useEffect(() => {
    const fetchSubCategory = async () => {
      if (!categoryId || !subCategoryId) return;

      // Check if data is cached and not expired
      const cachedData = localStorage.getItem(`subcategory-${subCategoryId}`);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();
        if (now - timestamp < CACHE_EXPIRY_TIME) {
          setSubCategory(data);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/categories/get-categories-with-sub-categories`,
          {
            headers: {
              accept: "*/*",
              "Accept-Language": locale === "ar" ? "ar-SA" : "en-US", // Set Accept-Language based on locale
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch subcategory data");
        }

        const data = await response.json();
        const categories = data.data;

        // Find the subcategory in the categories
        let foundSubCategory: SubCategory | null = null;
        for (const category of categories) {
          const subCategory = category.subCategories.find(
            (sub: { subCategoryId: number }) =>
              sub.subCategoryId === parseInt(subCategoryId)
          );
          if (subCategory) {
            foundSubCategory = {
              ...subCategory,
              categoryName: category.categoryName,
            };
            break;
          }
        }

        if (foundSubCategory) {
          setSubCategory(foundSubCategory);
          // Cache the data with a timestamp
          localStorage.setItem(
            `subcategory-${subCategoryId}`,
            JSON.stringify({
              data: foundSubCategory,
              timestamp: new Date().getTime(),
            })
          );
        } else {
          throw new Error("Subcategory not found");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategory();
  }, [categoryId, subCategoryId, locale]); // Add locale to the dependency array

  return { subCategory, loading, error };
};