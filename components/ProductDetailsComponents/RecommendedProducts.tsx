"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import ProductCard from "../SharedComponents/ProductCard";
import { products } from "./data";

const RecommendedProducts = () => {
  // Filter products with the "recommendation" category
  const recommendedProducts = products.filter(
    (p) => p.category === "recommendation"
  );

  return (
    <div>
      {/* Section Heading */}
      <h2 className="text-[20px] font-semibold xlg:text-[30px]">
        Our Recommendations
      </h2>

      {/* Grid Layout for Larger Screens (lg and above) */}
      <div className="hidden lg:grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {recommendedProducts.map((product) => (
          <Link href="/" key={product.id}>
            <ProductCard
              mainFileId={product.mainFileId}
              alt={product.alt}
              title={product.title}
              price={product.price}
              newBadge={product.newBadge}
              saleBadge={product.saleBadge}
              saleAmount={product.saleAmount}
            />
          </Link>
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
              <Link href="/">
                <ProductCard
                  mainFileId={product.mainFileId}
                  alt={product.alt}
                  title={product.title}
                  price={product.price}
                  newBadge={product.newBadge}
                  saleBadge={product.saleBadge}
                  saleAmount={product.saleAmount}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecommendedProducts;