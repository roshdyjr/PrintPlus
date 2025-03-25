"use client";
import { Star } from "lucide-react";
import { useState } from "react";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const reviews = [
  {
    name: "Fahd Al-Ali",
    review:
      "I submitted my order and was worried that I had designed it incorrectly. When I received the product, I was very happy because everything went well and due to the quality.",
    time: "17 days ago",
  },
  {
    name: "Ali Al-Rifai",
    review:
      "I received my new product, and I was very excited to see it. I was impressed by its high quality and unique design. I will definitely come back to buy more.",
    time: "2 months ago",
  },
  {
    name: "Sami Al-Jubouri",
    review:
      "I was very excited to see the result. When I received the product, my joy was indescribable! The design was amazing, and the quality exceeded my expectations. Everything was neat and organized, which made my experience extremely enjoyable.",
    time: "1 year ago",
  },
  {
    name: "Ali Al-Rifai",
    review:
      "I received my new product, and I was very excited to see it. I was impressed by its high quality and unique design. I will definitely come back to buy more.",
    time: "2 months ago",
  },
  {
    name: "Sami Al-Jubouri",
    review:
      "I was very excited to see the result. When I received the product, my joy was indescribable! The design was amazing, and the quality exceeded my expectations. Everything was neat and organized, which made my experience extremely enjoyable.",
    time: "1 year ago",
  },
];

const featuredReview = {
  name: "Mohammed Ahmed",
  review:
    "This is the best product I've ever purchased! The quality is outstanding and the service was exceptional. Highly recommended!",
  time: "3 days ago",
};

export default function Reviews() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="mx-auto flex flex-col gap-[2px] px-4 mt-0 max-w-[1920px] lg:px-[71.55px] lg:mt-[71.55px] xlg:gap-6">
      <div className="flex flex-col gap-[15px]">
        <div className="flex-col flex gap-[10px]">
          <h2 className="text-xl font-semibold xlg:text-[30px]">
            Most recent reviews
          </h2>
          <div className="flex flex-col gap-[8px] items-center w-[120px] xlg:w-[233px] ">
            <div className="flex items-center gap-2">
              <Star
                className="text-[#6366F1] w-[20px] h-[19px] xlg:w-[35px] xlg:h-[35px]"
                fill="currentColor"
              />
              <span className="text-lg font-semibold xlg:text-[38px]">
                4.8/5.0
              </span>
            </div>

            <p className="text-[#A6A6A6] text-sm xlg:text-[20px]">50 Reviews</p>
          </div>
        </div>

        <hr />
        {/* Featured Review  */}
        <div className="border-b-2 border-[#E2E8F0] pb-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex text-[#6366F1]">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={`featured-${i}`}
                    className="w-[16px] h-[16px] xlg:w-[24px] xlg:h-[24px]"
                    fill="currentColor"
                  />
                ))}
                <FaRegStarHalfStroke
                  className="w-[16px] h-[16px] xlg:w-[24px] xlg:h-[24px]"
                  fill="currentColor"
                />
              </div>
            </div>
            <span className="text-gray-400 text-sm ml-auto xlg:text-[18px]">
              {featuredReview.time}
            </span>
          </div>
          <h1 className="text-[16px] font-[600] text-[#0F172A] pt-2 xlg:text-[20px]">
            {featuredReview.name}
          </h1>
          <p className="text-[#0F172A] font-[400] text-[14px] py-2 xlg:text-[20px]">
            {featuredReview.review}
          </p>
        </div>
      </div>
      {/* ///// Review/////////*/}
      <div className="">
        {/* Regular Reviews */}
        <ul className="space-y-4 xlg:space-y-8">
          {(showAll ? reviews : reviews.slice(0, 3)).map((review, index) => (
            <li key={index} className="border-b-2 border-[#E2E8F0] pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#6366F1]">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-[16px] h-[16px] xlg:w-[24px] xlg:h-[24px]"
                        fill="currentColor"
                      />
                    ))}
                    <FaRegStarHalfStroke
                      className="w-[16px] h-[16px] xlg:w-[24px] xlg:h-[24px]"
                      fill="currentColor"
                    />
                  </div>
                </div>
                <span className="text-gray-400 text-sm ml-auto xlg:text-[18px]">
                  {review.time}
                </span>
              </div>
              <h1 className="text-[16px] font-[600] text-[#0F172A] pt-2 xlg:text-[20px]">
                {review.name}
              </h1>

              <p className="text-[#0F172A] font-[400] text-[14px] py-2 xlg:text-[20px]">
                {review.review}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {/* ///////button//////// */}
      <div className="mt-6">
        <button
          className="px-10 py-2 bg-[#F1F5F9] text-gray-700 rounded-[20px] hover:bg-gray-200"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : `Read all ${reviews.length} reviews`}
        </button>
      </div>
    </div>
  );
}
