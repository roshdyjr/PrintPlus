"use client";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import BusinessCardImages from "./BusinessCardImages";
import BusinessCardDetails from "./BusinessCardDetails";
import ProductDetailsBreadcrumbs from "./ProductDetailsBreadcrumbs";

interface BusinessCardProps {
  productName: string;
  mainFileId: number;
  fileIds: number[];
  description: string;
  productOptions: any[];
  firstPrice: number;
  averageRate: number;
  reviewsCount: number;
  faQs: any[];
  productInstallation: any;
  productDesign: any;
  productFastDelivery: any;
  designGuideLineFileId: number | null;
  designGuidelines: Array<{
    seq: number;
    text: string;
  }>;
}

export default function BusinessCard({
  productName,
  mainFileId,
  fileIds,
  description,
  productOptions,
  firstPrice,
  averageRate,
  reviewsCount,
  faQs,
  productInstallation,
  productDesign,
  productFastDelivery,
  designGuideLineFileId,
  designGuidelines,
}: BusinessCardProps) {
  return (
    <div className="">
      {/* Breadcrumbs Section */}
      <div className="py-5 xlg:py-[35.78px]">
        <ProductDetailsBreadcrumbs productName={productName} />
      </div>

      <div className="mx-auto w-full">
        {/* Mobile-Only Title and Rating Section */}
        <div className="md:hidden px-4 mb-4">
          <h1 className="text-[#0F172A] text-[20px] font-[600]">
            {productName}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            {[...Array(Math.floor(averageRate))].map((_, index) => (
              <FaStar
                key={index}
                className="text-[#6366F1] w-[11px] h-[10px]"
              />
            ))}
            {averageRate % 1 >= 0.5 && (
              <FaRegStarHalfStroke className="text-[#6366F1] w-[11px] h-[10px]" />
            )}
            <span className="text-sm text-gray-600">
              ({reviewsCount} rating)
            </span>
          </div>
        </div>

        {/* Grid Layout for Product Images and Details */}
        <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-5 xlg:gap-12 w-full lg:w-full lg:px-[71.55px] xlg:w-[1351px] xlg:px-0 mx-auto">
          {/* Left Column: Sticky Business Card Images */}
          <div className="sticky w-full">
            <BusinessCardImages
              mainFileId={mainFileId}
              fileIds={fileIds}
              description={description}
            />
          </div>

          {/* Right Column: Business Card Details (Options, Price, etc.) */}
          <div>
            <BusinessCardDetails
              productOptions={productOptions}
              name={productName}
              firstPrice={firstPrice}
              averageRate={averageRate}
              reviewsCount={reviewsCount}
              faQs={faQs}
              productInstallation={productInstallation}
              productDesign={productDesign}
              productFastDelivery={productFastDelivery}
              designGuideLineFileId={designGuideLineFileId}
              designGuidelines={designGuidelines}
            />
          </div>
        </div>
      </div>
    </div>
  );
}