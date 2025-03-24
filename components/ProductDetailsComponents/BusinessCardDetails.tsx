// BusinessCardDetails component
"use client";
import { useState } from "react";
import FileUpload from "./FileUpload";
import ServiceOptions from "./ServiceOptions";
import { FaStar, FaRegCommentDots, FaRegUser } from "react-icons/fa";
import Dropdown from "./Dropdown";
import Image from "next/image";
import Size_1 from "/public/Size_1.svg";
import Size_2 from "/public/Size_2.svg";
import Edges_1 from "/public/Edges_1.svg";
import Edges_2 from "/public/Edges_2.svg";
import CustomButton from "../SharedComponents/CustomButton";
import ExpressDelivery from "./Express_Delivery";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

interface ProductOption {
  productOptionId: number;
  productOptionName: string;
  isImageProductOption: boolean;
  isColorProductOption: boolean;
  productSubOptions: {
    productSubOptionId: number;
    productSubOptionName: string;
    productSubOptionColorCode: string | null;
  }[];
}

interface BusinessCardDetailsProps {
  productOptions: any[];
  name: string;
  firstPrice: number;
  averageRate: number;
  reviewsCount: number;
  faQs: any[];
  productInstallation: {
    visitPrice: number;
    unitPrice: number;
  } | null;
  productDesign: {
    designServiceName: string;
    productDesignPrice: number;
  } | null;
  productFastDelivery: {
    price: number;
    duration: number;
    isDay: boolean;
    isHour: boolean;
  } | null;
  designGuideLineFileId: number | null;
  designGuidelines: Array<{
    seq: number;
    text: string;
  }>;
}

export default function BusinessCardDetails({
  productOptions,
  name,
  firstPrice,
  averageRate,
  reviewsCount,
  faQs,
  productInstallation,
  productDesign,
  productFastDelivery,
  designGuideLineFileId,
  designGuidelines,
}: BusinessCardDetailsProps) {
  // State management
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number>
  >({});
  const [quantity, setQuantity] = useState(2);
  const [files] = useState<any[]>([]);
  const locale = useLocale();
  const t = useTranslations("ProductDetails");

  const handleOptionSelect = (optionId: number, subOptionId: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: subOptionId,
    }));
  };

  const renderOption = (option: ProductOption) => {
    if (option.isImageProductOption) {
      return (
        <div key={option.productOptionId} className="flex flex-col gap-4">
          <label className="block text-[20px] font-[600] text-[#0F172A]">
            {option.productOptionName}
          </label>
          <div className="flex gap-4">
            {option.productSubOptions.map((subOption) => (
              <button
                key={subOption.productSubOptionId}
                className={`flex flex-col items-start w-[197px] h-[164px] border-2 rounded-[13.26px] text-[14px] p-[10px] ${
                  selectedOptions[option.productOptionId] ===
                  subOption.productSubOptionId
                    ? "border-[#6366F1] text-[#6366F1] bg-[#fff]"
                    : "border-gray-300 text-[#94A3B8]"
                }`}
                onClick={() =>
                  handleOptionSelect(
                    option.productOptionId,
                    subOption.productSubOptionId
                  )
                }
              >
                <Image
                  src={getOptionImage(
                    option.productOptionName,
                    subOption.productSubOptionName
                  )}
                  alt={subOption.productSubOptionName}
                  className="self-center mb-2"
                />
                <span className="self-start text-left font-semibold text-[16px]">
                  {getOptionDisplayName(subOption.productSubOptionName)}
                </span>
                <span
                  className={`text-[14px] font-[400] text-left self-start ${
                    selectedOptions[option.productOptionId] ===
                    subOption.productSubOptionId
                      ? "text-[#6366F1]"
                      : "text-[#0F172A]"
                  }`}
                >
                  {subOption.productSubOptionName}
                </span>
              </button>
            ))}
          </div>
        </div>
      );
    } else if (option.isColorProductOption) {
      return (
        <div key={option.productOptionId} className="flex flex-col gap-4">
          <label className="block text-[20px] font-semibold text-shadeBlack">
            {option.productOptionName}
          </label>
          <div className="flex justify-center gap-4">
            {option.productSubOptions.map((subOption) => (
              <div
                className="flex flex-col items-center"
                key={subOption.productSubOptionId}
              >
                <div
                  className={`p-[6px] rounded-full border-[3px] cursor-pointer ${
                    selectedOptions[option.productOptionId] ===
                    subOption.productSubOptionId
                      ? "border-[#6366F1] shadow-lg"
                      : "border-[#D7DADD]"
                  }`}
                  onClick={() =>
                    handleOptionSelect(
                      option.productOptionId,
                      subOption.productSubOptionId
                    )
                  }
                >
                  <div
                    className="h-[37px] w-[37px] rounded-full"
                    style={{
                      backgroundColor:
                        subOption.productSubOptionColorCode || "transparent",
                      border: subOption.productSubOptionColorCode
                        ? "none"
                        : "1px solid #ccc",
                    }}
                  />
                </div>
                {selectedOptions[option.productOptionId] ===
                  subOption.productSubOptionId && (
                  <div className="mt-1 text-[14px] font-medium text-[#0F172A]">
                    {subOption.productSubOptionName}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div key={option.productOptionId} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="block text-[16px] font-semibold text-shadeBlack xlg:text-[20px]">
              {option.productOptionName}
            </label>
            <div className="flex gap-[17.89px]">
              {option.productSubOptions.map((subOption) => (
                <button
                  key={subOption.productSubOptionId}
                  className={`py-[14.91px] px-[23.85px] border-2 rounded-[29.81px] text-[14px] text-[#94A3B8] bg-[#F8FAFC] font-semibold w-[118px] xlg:w-[176px] xlg:h-[59.81px] xlg:text-[20px] ${
                    selectedOptions[option.productOptionId] ===
                    subOption.productSubOptionId
                      ? "border-[#6366F1] text-[#6366F1] bg-[#fff]"
                      : "border-gray-300"
                  }`}
                  onClick={() =>
                    handleOptionSelect(
                      option.productOptionId,
                      subOption.productSubOptionId
                    )
                  }
                >
                  {subOption.productSubOptionName}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  // Helper function to get appropriate image for options
  const getOptionImage = (optionName: string, subOptionName: string) => {
    if (optionName === "Size") {
      return subOptionName.includes("3.5x2.0") ? Size_1 : Size_2;
    } else if (optionName === "Edges" || optionName === "Card pillars") {
      return subOptionName.includes("Round") ? Edges_1 : Edges_2;
    }
    return Size_1; // default
  };

  // Helper function to get display names
  const getOptionDisplayName = (name: string) => {
    if (name === "3.5x2.0") return locale === "ar" ? "قياسي" : "Standard";
    if (name === "3.5x3.5") return locale === "ar" ? "مربع" : "Square";
    return name;
  };

  return (
    <div className="w-full xl:min-w-[568px] flex flex-col gap-8">
      {/* Product Title and Ratings Section */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-[13.42px]">
          <h1 className="text-shadeBlack font-semibold text-[22px] xlg:text-[24px]">
            {name}
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#FBF3EA] text-[#f59f0bd1] px-2 py-1 rounded-full text-sm font-semibold">
              <FaStar className="w-[14px] h-[14px] mr-1" />
              {averageRate.toFixed(1)}
            </div>
            <div className="flex items-center bg-[#EDF0F8] text-[#3A4980] px-2 py-1 rounded-full text-sm font-semibold">
              <FaRegCommentDots className="w-[14px] h-[14px] me-1" />
              {reviewsCount} {t("reviews")}
            </div>
            <div className="flex items-center bg-[#EAF7FB] text-[#3B99D4] px-2 py-1 rounded-full text-sm font-semibold">
              <FaRegUser className="w-[14px] h-[14px] me-1" />
              {t("questionsAndAnswers")} ({faQs.length})
            </div>
          </div>
        </div>
      </div>
      <hr />

      {/* Only show product options container if there are options */}
      {productOptions.length > 0 && (
        <div className="flex flex-col gap-[29.81px]">
          {productOptions.map((option, index) => (
            <div
              key={option.productOptionId}
              className="flex flex-col gap-[29.81px]"
            >
              {renderOption(option)}
              {/* Only show HR if not the last item */}
              {index < productOptions.length - 1 && <hr />}
            </div>
          ))}
        </div>
      )}

      {/* Only show services container if there's either fast delivery or service options */}
      {(productFastDelivery || productInstallation || productDesign) && (
        <div className="flex flex-col gap-[35.78px]">
          {productFastDelivery && (
            <>
              <ExpressDelivery
                fastDelivery={productFastDelivery}
                quantity={quantity}
              />
              {/* Only show HR if there will be content after it */}
              {(productInstallation || productDesign) && <hr />}
            </>
          )}

          {(productInstallation || productDesign) && (
            <ServiceOptions
              installation={productInstallation}
              design={productDesign}
              quantity={quantity}
            />
          )}
        </div>
      )}
      {/* File Upload and Price Section */}
      <div className="flex flex-col gap-[35.78px] pb-4 lg:pb-[47.7px]">
        <FileUpload
          designGuideLineFileId={designGuideLineFileId}
          designGuidelines={designGuidelines}
        />
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={index} className="text-sm">
                {file.name}
              </li>
            ))}
          </ul>
        )}
        <hr />
        <p className="text-[20px] font-bold text-center text-shadeBlack xlg:text-[36px]">
          {firstPrice} {t("currency")}
        </p>
        <CustomButton
          label={t("addToCart")}
          className="!w-[314px] !h-[44px] xlg:!w-[467px] xlg:!h-[65.81px] self-center"
          icon="/Cart-plus.svg"
        />
      </div>
    </div>
  );
}
