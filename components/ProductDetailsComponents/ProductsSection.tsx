"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../SharedComponents/ProductCard";
import { products } from "./data";
import RecommendedProducts from "./RecommendedProducts";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

const ProductsSection = () => {
  // Filter products with the "similar" category
  const similarProducts = products.filter((p) => p.category === "similar");
  const t = useTranslations("ProductDetails");

  return (
    <div className="mx-auto max-w-[1920px] w-full flex flex-col py-4 px-4 my-0 gap-4 lg:px-[71.55px] lg:mb-[71.55px] xlg:mt-[71.55px] xlg:gap-6">
      {/* Section Heading */}
      <h2 className="text-[20px] font-semibold xlg:text-[30px]">
        {t("similar")}
      </h2>

      {/* Grid Layout for Larger Screens (lg and above) */}
      <div className="hidden lg:grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full">
        {similarProducts.map((product) => (
          <ProductCard
            key={product.id}
            id= {product.id}
            mainFileId={product.mainFileId}
            alt={product.alt}
            title={product.title}
            price={product.price}
            newBadge={product.newBadge}
            saleBadge={product.saleBadge}
            saleAmount={product.saleAmount}
          />
        ))}
      </div>

      {/* Swiper Carousel for Medium and Smaller Screens (md and below) */}
      <div className="lg:hidden">
        <Swiper
          slidesPerView={2} // Number of slides visible at once
          spaceBetween={10} // Space between slides
          modules={[Autoplay]} // Enable Autoplay module
          autoplay={{
            delay: 2000, // Autoplay delay in milliseconds
            disableOnInteraction: false, // Continue autoplay after user interaction
          }}
          loop={true} // Enable infinite loop
          className="mySwiper"
        >
          {similarProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                mainFileId={product.mainFileId}
                id={product.id}
                alt={product.alt}
                title={product.title}
                price={product.price}
                newBadge={product.newBadge}
                saleBadge={product.saleBadge}
                saleAmount={product.saleAmount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Recommended Products Section */}
      <RecommendedProducts />
    </div>
  );
};

export default ProductsSection;
