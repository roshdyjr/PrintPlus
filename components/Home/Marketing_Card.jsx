"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Marketing_Card_1 from "../../public/Home/Marketing_Card_1.svg";
import Marketing_Card_2 from "../../public/Home/Marketing_Card_2.svg";

const offers = [
  {
    id: 1,
    title: "marketing message",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod.",
    img: Marketing_Card_1,
  },
  {
    id: 2,
    title: "marketing message",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod.",
    img: Marketing_Card_2,
  },
];

const Marketing_Card = () => {
  return (
    <section className="py-12 md:px-20 px-[16px]">
      <div className=" ">
        <Swiper
          slidesPerView={1}
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
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
          className="w-full"
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <div className="flex flex-col">
                <Image
                  src={offer.img}
                  alt={offer.title}
                  width={600}
                  height={350}
                  className="w-full rounded-t-md"
                />
                <div className="p-5 bg-[#0F172A] md:flex md:flex-row  justify-between items-center rounded-b-md flex-col ">
                  <div>
                    <h3 className="text-[24px] text-white font-[600]">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-[15.38px] font-[400] text-white py-2">
                      {offer.description}
                    </p>
                  </div>
                  <div>
                    <button className="w-[126px] h-[39.22px] mt-2 text-black bg-white rounded-[26.91px]">
                      Shop now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Marketing_Card;
