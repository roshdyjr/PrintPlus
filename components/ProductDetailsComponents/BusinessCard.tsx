"use client";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import BusinessCardImages from "./BusinessCardImages";
import BusinessCardDetails from "./BusinessCardDetails";
import ProductDetailsBreadcrumbs from "./ProductDetailsBreadcrumbs";

export default function Business_card() {
  return (
    <div className="">
      {/* Breadcrumbs Section */}
      <div className="py-5 xlg:py-[35.78px]">
        <ProductDetailsBreadcrumbs />
      </div>

      {/* Main Container for Product Details */}
      <div className="mx-auto w-full">
        {/* Mobile-Only Title and Rating Section */}
        <div className="md:hidden px-4 mb-4">
          <h1 className="text-[#0F172A] text-[20px] font-[600]">
            Gold Business Cards
          </h1>
          {/* Rating Stars (4 full stars + 1 half star) */}
          <div className="flex items-center gap-2 mt-2">
            {[...Array(4)].map((_, index) => (
              <FaStar
                key={index}
                className="text-[#6366F1] w-[11px] h-[10px]"
              />
            ))}
            <FaRegStarHalfStroke className="text-[#6366F1] w-[11px] h-[10px]" />
            <span className="text-sm text-gray-600">(50 rating)</span>
          </div>
        </div>

        {/* Grid Layout for Product Images and Details */}
        <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-5 xlg:gap-12 w-full lg:w-full lg:px-[71.55px] xlg:w-[1351px] xlg:px-0 mx-auto">
          {/* Left Column: Sticky Business Card Images */}
          <div className="sticky">
            <BusinessCardImages />
          </div>

          {/* Right Column: Business Card Details (Options, Price, etc.) */}
          <div>
            <BusinessCardDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
