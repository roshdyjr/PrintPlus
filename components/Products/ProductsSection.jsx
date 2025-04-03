"use client";

import React from "react";
import { products } from "./data";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import RecommendedProducts from "./RecommendedProducts";  

const ProductsSection = () => {
  const similarProducts = products.filter((p) => p.category === "similar");

  return (
    <div className="px-5 py-10 md:px-20 3xl:px-40">
      <h2 className="text-[20px] font-bold mb-4">Similar Products</h2>
      <div className="hidden grid-cols-2 gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="sm:hidden">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="mySwiper"
        >
          {similarProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  
       <RecommendedProducts />
    </div>
  );
};

export default ProductsSection;