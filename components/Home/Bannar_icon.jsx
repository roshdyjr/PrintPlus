"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Autoplay } from "swiper/modules";  
import Bannar_icon_1 from "../../../public/Home/bannar_icon_1.svg";
import Bannar_icon_2 from "../../../public/Home/bannar_icon_2.svg";
import Bannar_icon_3 from "../../../public/Home/bannar_icon_3.svg";
import Bannar_icon_4 from "../../../public/Home/bannar_icon_4.svg";
import Image from "next/image";

const features = [
  {
    id: 1,
    icon: Bannar_icon_1,
    title: "Printing to suit every budget",
    description: "Select options that suit your budget.",
  },
  {
    id: 2,
    icon: Bannar_icon_2,
    title: "On-time delivery",
    description: "Printing and delivery that fit your schedule.",
  },
  {
    id: 3,
    icon: Bannar_icon_3,
    title: "Guaranteed quality",
    description: "We ensure your satisfaction with top printing standards.",
  },
  {
    id: 4,
    icon: Bannar_icon_4,
    title: "Easy ordering and payment",
    description: "A simple ordering process with secure, fast payment.",
  },
];

export default function Bannar_icon() {
  return (
    <div className="w-full py-10 md:px-20 3xl:px-40 px-[16px]">
       <div className="justify-between hidden gap-6 md:flex">
        {features.map((feature) => (
          <div key={feature.id} className="text-center max-w-[250px]">
            <Image src={feature.icon} alt={feature.title} className="w-[66.88px] h-[66.88px] mx-auto mb-2" />
            <h3 className="text-[16px] font-[600]">{feature.title}</h3>
            <p className="text-[14px] font-[400] text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

       <div className="md:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          freeMode={true}
          loop={true}  
          autoplay={{
            delay: 3000,  
            disableOnInteraction: false,  
          }}
          breakpoints={{
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
          }}
          modules={[FreeMode, Autoplay]}  
          className="w-full"
        >
          {features.map((feature) => (
            <SwiperSlide key={feature.id} className="text-center">
              <Image src={feature.icon} alt={feature.title} className="w-[66.88px] h-[66.88px] mx-auto mb-2" />
              <h3 className="text-[16px] font-[600]">{feature.title}</h3>
              <p className="text-[14px] font-[400] text-gray-600">{feature.description}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}