"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../SharedComponents/ProductCard";
import { products } from "./data";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

const RecommendedProducts = () => {
  // Filter products with the "recommendation" category
  const recommendedProducts = products.filter(
    (p) => p.category === "recommendation"
  );
  const locale = useLocale();
  const t = useTranslations("ProductDetails");

  return (
    <div className="flex flex-col gap-4">
      {/* Section Heading */}
      <h2 className="text-[20px] font-semibold xlg:text-[30px]">
        {t("recommendations")}
      </h2>

      {/* Grid Layout for Larger Screens (lg and above) */}
      <div className="hidden lg:grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {recommendedProducts.map((product) => (
          <div key={product.id}>
            <ProductCard
              mainFileId={product.mainFileId}
              id= {product.id}
              alt={product.alt}
              title={product.title}
              price={product.price}
              newBadge={product.newBadge}
              saleBadge={product.saleBadge}
              saleAmount={product.saleAmount}
            />
          </div>
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
          {recommendedProducts.map((product) => (
            <SwiperSlide key={product.id}>
                <ProductCard
                  mainFileId={product.mainFileId}
                  id= {product.id}
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
    </div>
  );
};

export default RecommendedProducts;
