"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

interface BusinessCardImagesProps {
  mainFileId: number;
  fileIds: number[];
  description: string;
}

export default function BusinessCardImages({
  mainFileId,
  fileIds,
  description,
}: BusinessCardImagesProps) {
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
    const t = useTranslations("ProductDetails");

  const fetchImage = async (fileId: number): Promise<string | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/get-product-file?id=${fileId}&type=2`,
        {
          headers: {
            accept: "*/*",
            "Accept-Language": locale,
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch image (Status: ${response.status})`);
      }

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (err) {
      console.error(`Error fetching image ${fileId}:`, err);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;
    const objectUrls: string[] = [];

    const loadImages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch main image
        const mainUrl = await fetchImage(mainFileId);
        if (isMounted && mainUrl) {
          setMainImageUrl(mainUrl);
          objectUrls.push(mainUrl);
        }

        // Fetch all thumbnails (including main image if needed)
        const uniqueFileIds = Array.from(new Set([mainFileId, ...fileIds]));
        const thumbnailPromises = uniqueFileIds.map(fetchImage);
        const urls = (await Promise.all(thumbnailPromises)).filter(
          Boolean
        ) as string[];

        if (isMounted) {
          setThumbnailUrls(urls);
          urls.forEach((url) => objectUrls.push(url));
        }
      } catch (err) {
        console.error("Image loading failed:", err);
        if (isMounted) {
          setError("Failed to load product images. Please try again later.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadImages();

    return () => {
      isMounted = false;
      // Clean up object URLs
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [mainFileId, fileIds, locale]);

  if (isLoading) {
    return (
      <div className="sticky top-0 flex flex-col gap-[25.34px] w-full xlg:min-w-[735px]">
        <div className="w-full h-[490px] bg-gray-200 animate-pulse rounded-[6.58px]"></div>
        <div className="flex gap-[23.85px]">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="xlg:rounded-[6.58px] xlg:w-[139px] xlg:h-[109px] bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sticky top-0 p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="sticky top-0 flex flex-col gap-[25.34px] w-full xlg:min-w-[735px]">
      {/* Main image and thumbnails container */}
      <div className="flex flex-col gap-[26.3px]">
        {/* Main Image */}
        {mainImageUrl ? (
          <Image
            src={mainImageUrl}
            alt="Product main image"
            width={735}
            height={490}
            className="rounded-[6.58px] w-full h-auto object-cover xlg:w-[735px] xlg:h-[490px]"
            priority
          />
        ) : (
          <div className="w-full h-[490px] bg-gray-100 rounded-[6.58px] flex items-center justify-center text-gray-500">
            Main image not available
          </div>
        )}

        {/* Thumbnails Container */}
        <div className="flex items-center gap-[23.85px]">
          {thumbnailUrls.length > 0 ? (
            thumbnailUrls.map((url, index) => (
              <div
                key={index}
                className="xlg:rounded-[6.58px] xlg:w-[139px] xlg:h-[109px] relative group cursor-pointer"
              >
                <Image
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  width={139}
                  height={109}
                  className={`h-full w-full object-cover rounded-[6.58px] transition-all ${
                    url === mainImageUrl
                      ? "ring-2 ring-[#6366F1]"
                      : "group-hover:ring-2 group-hover:ring-gray-300"
                  }`}
                  onClick={() => setMainImageUrl(url)}
                />
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm">No thumbnails available</div>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="text-sm text-gray-700 flex flex-col gap-3 xlg:gap-[23.85px]">
        <h3 className="text-[15px] text-[#2E2E2E] font-medium xlg:text-[21px]">
          {t("productDetails")}
        </h3>
        <div
          className="text-[12px] font-[300] text-black xlg:text-[18px] prose"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}
