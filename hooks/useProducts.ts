import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Product {
  productId: number;
  name: string;
  mainFileId: number;
  firstPrice: number;
  firstQuantity: number;
}

export const useProducts = (subCategoryId: string | undefined) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale(); // Get the current locale

  useEffect(() => {
    const fetchProducts = async () => {
      if (!subCategoryId) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/products/get-all?subCategoryId=${subCategoryId}`,
          {
            headers: {
              accept: "*/*",
              "Accept-Language": locale === "ar" ? "ar-SA" : "en-US", // Set Accept-Language based on locale
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subCategoryId, locale]); // Add locale to the dependency array

  return { products, loading, error };
};