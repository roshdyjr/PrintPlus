"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Autoplay } from "swiper/modules";  
import img_TOP_Selling_products_1 from '../../public/Home/img_TOP_Selling_products_1.svg';
import img_TOP_Selling_products_2 from '../../public/Home/img_TOP_Selling_products_2.svg';
import img_TOP_Selling_products_3 from '../../public/Home/img_TOP_Selling_products_3.svg';
import img_TOP_Selling_products_4 from '../../public/Home/img_TOP_Selling_products_4.svg';
import img_TOP_Selling_products_5 from '../../public/Home/img_TOP_Selling_products_5.svg';
import Image from "next/image";

const products = [
  { id: 1, name: "Post Cards", image: img_TOP_Selling_products_1 },
  { id: 2, name: "Business Cards", image: img_TOP_Selling_products_2 },
  { id: 3, name: "Labels", image: img_TOP_Selling_products_3 },
  { id: 4, name: "Flags", image: img_TOP_Selling_products_4 },
  { id: 5, name: "Pens", image: img_TOP_Selling_products_5 },
];

export default function TOP_Selling_products() {
  return (
    <div className="py-14 md:px-20 3xl:px-40 px-[16px]">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
         <div className="w-full md:w-[200px] lg:w-[250px] bg-[#E0E7FF] h-[200px] md:h-[250px] flex flex-col justify-center items-center p-4 rounded-lg">
          <h2 className="text-[20px] font-[600] text-[#4F46E5]">
            TOP <br /> Selling <br /> Products.
          </h2>
          <a href="#" className="inline-block mt-2 font-[600] text-[14px] text-[#4F46E5]">
            Discover &rarr;
          </a>
        </div>

         <div className="w-full md:w-[calc(100%-250px)]">
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            freeMode={true}
            loop={true}  
            autoplay={{
              delay: 3000,  
              disableOnInteraction: false,  
            }}
            breakpoints={{
              480: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            modules={[FreeMode, Autoplay]}  
            className="w-full"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[200px] md:h-[250px]   rounded-lg object-cover"
                />
                <span className="absolute px-3 py-1 text-sm font-medium bg-white rounded-md bottom-2 left-2">
                  {product.name}
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}