"use client";
import { useLocale } from "next-intl";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useTranslations } from "next-intl";

interface ProductDetailsBreadcrumbsProps {
  productName: string;
}

const ProductDetailsBreadcrumbs = ({ productName }: ProductDetailsBreadcrumbsProps) => {
  const locale = useLocale();
  const t = useTranslations("ProductDetails");

  // Localized breadcrumb data
  const breadcrumbs = [
    { name: t("home") },
    { name: t("products") },
    { name: productName }, // Dynamic product name remains as is
  ];

  // Determine chevron direction based on locale
  const ChevronIcon = locale === "ar" ? FaChevronLeft : FaChevronRight;

  return (
    <div 
      className="flex items-center w-full sm:w-[551px] h-[30px] px-4 md:px-10 xlg:px-[71.55px]"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center">
          <span
            className={
              index < breadcrumbs.length - 1
                ? "text-[14px] text-shadeBlack xlg:text-[20px]"
                : "text-[14px] text-shadeGray xlg:text-[20px]"
            }
          >
            {breadcrumb.name}
          </span>

          {/* Show chevron after every item except the last one */}
          {index < breadcrumbs.length - 1 && (
            <div className="mx-2 xlg:mx-[11.93px]">
              <ChevronIcon className="text-shadeBlack text-[12px] xlg:text-[14px]" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductDetailsBreadcrumbs;