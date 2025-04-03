"use client";  

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";  
import printing_services_1 from "../../public/Home/printing_services_1.svg";
import printing_services_2 from "../../public/Home/printing_services_2.svg";
import printing_services_3 from "../../public/Home/printing_services_3.svg";
import printing_services_4 from "../../public/Home/printing_services_4.svg";
import printing_services_5 from "../../public/Home/printing_services_5.svg";

 const services = [
  { id: 1, title: "Large Products and Boards", img: printing_services_1 },
  { id: 2, title: "Clothing and Fabrics", img: printing_services_2 },
  { id: 3, title: "Packaging and Labels", img: printing_services_3 },
  { id: 4, title: "Promotional Gifts", img: printing_services_4 },
  { id: 5, title: "Business Supplies", img: printing_services_5 },
];

const Printing_services = () => {
  return (
    <section className="px-6 py-12 text-center">
       <h2 className="text-[#000000] font-[600] text-[28px]">
        We offer you the best printing services.
      </h2>
      <p className="mt-2 text-[#000000] font-[400] text-[16px]">
        You can choose any of the available secure and fast payment methods on the platform.
      </p>

       <div className="mt-8 ">
        <Swiper
          slidesPerView={2}  
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}  
          autoplay={{
            delay: 3000,  
            disableOnInteraction: false,  
          }}
          loop={true}  
          breakpoints={{
             768: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          className="md:w-[60%] w-full"
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <div className="text-center">
                <div className="flex items-center justify-center ">
                  <Image
                    src={service.img}
                    alt={service.title}
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                </div>
                <p className="mt-2 text-[14px] font-[500] text-gray-700 w-[122px]   mx-auto">{service.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Printing_services;