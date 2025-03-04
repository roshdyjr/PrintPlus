import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

export const useBannerImage = (fileId: number | undefined) => {
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBannerImage = async () => {
      if (!fileId) return;

      // Check if data is cached and not expired
      const cachedData = localStorage.getItem(`banner-${fileId}`);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();
        if (now - timestamp < CACHE_EXPIRY_TIME) {
          setBannerImageUrl(data);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/files/get-file?id=${fileId}`,
          {
            headers: {
              accept: "*/*",
              "Accept-Language": "en-US",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch banner image");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setBannerImageUrl(imageUrl);
        // Cache the data with a timestamp
        localStorage.setItem(
          `banner-${fileId}`,
          JSON.stringify({
            data: imageUrl,
            timestamp: new Date().getTime(),
          })
        );
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBannerImage();
  }, [fileId]);

  return { bannerImageUrl, loading, error };
};