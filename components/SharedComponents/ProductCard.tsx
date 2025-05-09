"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ProductCardProps {
  id: number;
  mainFileId: number;
  alt: string;
  newBadge?: boolean;
  saleBadge?: boolean;
  title: string;
  price: string;
  saleAmount?: string;
}

const ProductCard = ({
  id,
  mainFileId,
  alt,
  newBadge,
  saleBadge,
  title,
  price,
  saleAmount,
}: ProductCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations("CategoriesList");

  // Fetch the product thumbnail image (UNCHANGED)
  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/get-product-file?id=${mainFileId}&type=2`,
          {
            headers: {
              accept: "*/*",
              "Accept-Language": "en-US",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product image");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };

    fetchProductImage();
  }, [mainFileId]);

  return (
    <Link
      // ONLY THIS LINE CHANGED (added '/2' for cityId)
      href={`/${locale}/productdetails/${id}/2`}
      className="flex flex-col gap-[5.79px] xlg:gap-[8.86px]"
    >
      {/* EVERYTHING BELOW REMAINS EXACTLY THE SAME */}
      <div className="relative w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            width={213}
            height={205}
            className="rounded-[3px] w-full h-[205px] xlg:h-[319px]"
          />
        ) : (
          <div className="w-full h-[205px] bg-gray-200 animate-pulse rounded-[3px]"></div>
        )}
        {newBadge && (
          <div className="absolute bottom-[5.9px] left-[6.24px] bg-[#0F172A] rounded-[20px] px-2 h-[24px] text-white text-xs font-semibold flex justify-center items-center">
            <p>New</p>
          </div>
        )}
        {saleBadge && (
          <div className="absolute bottom-[5.9px] left-[6.24px] bg-[#BE123C] rounded-[20px] px-2 h-[24px] text-white text-xs font-semibold flex justify-center items-center">
            <p>{saleAmount}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-black text-sm xlg:text-[20px]">
          {title}
        </p>
        <p className="text-sm flex items-center gap-[2px] xlg:text-[20px] xlg:h-[36px]">
          {t("startPrice")}{" "}
          <span className="font-semibold text-[#6366F1] xlg:text-[20px]">
            {price}
          </span>{" "}
          {t("currency")}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
