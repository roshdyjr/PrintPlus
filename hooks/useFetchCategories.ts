import { useState, useEffect } from "react";
import { useLocale } from "next-intl"; // Import useLocale from next-intl

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define TypeScript interfaces for category and subcategory structures
export interface SubCategory {
  subCategoryId: number;
  subCategoryName: string;
  subCategoryMainBannerFileId: number;
  subCategoryMobileBannerFileId: number;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  categoryFileId: number;
  categoryMainBannerFileId: number;
  categoryMobileBannerFileId: number;
  subCategories: SubCategory[];
}

// Custom hook to fetch categories and their subcategories
const useFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale(); // Get the current locale

  useEffect(() => {
    const fetchCategories = async () => {
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

        // Parse JSON response and update state with category data
        const data = await response.json();
        setCategories(data.data);
      } catch (err) {
        setError("Error fetching categories");
        console.error(err);
      } finally {
        setLoading(false); // Ensure loading state is updated after request completion
      }
    };

    fetchCategories();
  }, [locale]); // Add locale to the dependency array

  return { categories, loading, error };
};

export default useFetchCategories;