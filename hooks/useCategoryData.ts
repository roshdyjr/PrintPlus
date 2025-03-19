import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

interface Category {
  categoryId: number;
  categoryName: string;
  categoryFileId: number;
  categoryMainBannerFileId: number;
  categoryMobileBannerFileId: number;
}

export const useCategoryData = (categoryId: string | undefined) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale(); // Get the current locale

  useEffect(() => {
    const fetchActiveCategory = async () => {
      if (!categoryId) return;

      // Check if data is cached and not expired
      const cachedData = localStorage.getItem(`category-${categoryId}`);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();
        if (now - timestamp < CACHE_EXPIRY_TIME) {
          setActiveCategory(data);
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
          throw new Error("Failed to fetch categories");
        }

        const responseData = await response.json();
        const categories = responseData.data;

        // Find the active category
        const activeCategory = categories.find(
          (category: { categoryId: number }) =>
            category.categoryId === parseInt(categoryId)
        );

        if (activeCategory) {
          setActiveCategory(activeCategory);
          // Cache the data with a timestamp
          localStorage.setItem(
            `category-${categoryId}`,
            JSON.stringify({
              data: activeCategory,
              timestamp: new Date().getTime(),
            })
          );
        } else {
          throw new Error("Category not found");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCategory();
  }, [categoryId, locale]); // Add locale to the dependency array

  return { activeCategory, loading, error };
};