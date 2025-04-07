"use client";
import { useState } from "react";

import Image from "next/image";
import icon_Installation from "../../../public/cart/icon_Installation.svg";
import icon_Express from "../../../public/cart/icon_Express.svg";
import icon_personal from "../../../public/cart/icon_personal.svg";
import Product_image from "../../../public/cart/Product_image.svg";
import icon_Size_Adjustment from "../../../public/cart/icon_Size_Adjustment.svg";
import QuantityDropdown from "./QuantityDropdown";
import CartSummary from "./CartSummary";
import RecommendedProducts from "@/components/Products/RecommendedProducts";

export default function Cart() {
  const [quantity, setQuantity] = useState(50);

  const cartItems: any[] = [
    {
      arrival: "4 Aug, 2025",
      title: "Gold business card",
      quantity: 100,
      size: '2" x 3.5"',
      edges: "Round",
      foilColor: "Gold",
      installation: 35,
      adjustment: 24.5,
      delivery: 36.66,
      file: "my_personal card front design.pdf",
      total: 114,
    },
    {
      arrival: "4 Aug, 2025",
      title: "Gold business card",
      quantity: 100,
      size: '2" x 3.5"',
      edges: "Round",
      foilColor: "Gold",
      installation: 35,
      adjustment: 24.5,
      delivery: 36.66,
      file: "my_personal card front design.pdf",
      total: 114,
    },
    {
      arrival: "4 Aug, 2025",
      title: "Gold business card",
      quantity: 100,
      size: '2" x 3.5"',
      edges: "Round",
      foilColor: "Gold",
      installation: 35,
      adjustment: 24.5,
      delivery: 36.66,
      file: "my_personal card front design.pdf",
      total: 114,
    },
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-10">
      {cartItems.length === 0 ? (
        <div className="    py-20">
          <div className="  items-start justify-center  block text-center">
         <p className="text-[16px] font-[600]  text-[#000000]">Your shopping bag is empty.</p>
          <p className="text-[16px] font-[600]   text-[#000000]">
            Not sure where to start?
          </p>
          </div>

          <div className="py-10   3xl:px-40 px-[16px]">
            <RecommendedProducts />
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">Cart ({cartItems.length})</h2>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left - Cart Items */}
            <div className="flex-1">
              {cartItems.map((item, index) => (
                <div
                  className="bg-[#F8FAFC] p-4 rounded-xl shadow-md mb-6"
                  key={index}
                >
                  <div className="flex items-center justify-between py-2 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-2 text-[16px] font-[600] text-[#0F172A]">
                      <div className="w-[27px] h-[27px] rounded-full bg-[#FFC943] flex items-center justify-center">
                        <Image
                          src={icon_Express}
                          alt="express"
                          className="w-5 h-5"
                        />
                      </div>
                      Arriving {item.arrival}
                    </div>
                    <div className="text-[14px] font-[500] text-[#BE123C] cursor-pointer">
                      Remove
                    </div>
                  </div>
                  <div className="flex gap-4 py-6">
                    {/* Product Image */}
                    <div className="w-[70px] h-[90px] rounded-[4px] flex-shrink-0">
                      <Image
                        src={Product_image}
                        alt="Product Image"
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="w-full">
                          <div className="py-2 border-b border-[#E2E8F0]">
                            <h3 className="text-[16px] font-[600] mt-2">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 text-[14px] text-[#475569] font-[400] py-2">
                              Quantity:
                              <QuantityDropdown
                                quantity={quantity}
                                onChange={setQuantity}
                              />
                            </div>
                            <div className="text-[14px] font-[400] text-[#475569] flex-col gap-8">
                              <p className=" ">Size: {item.size}</p>
                              <p className="   ">Edges: {item.edges}</p>
                              <p className=" ">Foil Color: {item.foilColor}</p>
                            </div>
                          </div>
                          <div className="py-2 border-b border-[#E2E8F0]">
                            <ul className="mt-2 text-sm text-gray-600 space-y-1">
                              <li className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[#475569] text-[14px] font-[400]">
                                  <Image
                                    src={icon_Installation}
                                    alt="Installation"
                                    className="w-[20px] h-[20px]"
                                  />
                                  Installation
                                </div>
                                <span className="text-[14px] font-[500] text-[#000000]">
                                  {item.installation} SAR
                                </span>
                              </li>
                              <li className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[#475569] text-[14px] font-[400]">
                                  <Image
                                    src={icon_Size_Adjustment}
                                    alt="Adjustment"
                                    className="w-[20px] h-[20px]"
                                  />
                                  Size Adjustment
                                </div>
                                <span className="text-[14px] font-[500] text-[#000000]">
                                  {item.adjustment} SAR
                                </span>
                              </li>
                              <li className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[#475569] text-[14px] font-[400]">
                                  <Image
                                    src={icon_Express}
                                    alt="Delivery"
                                    className="w-[20px] h-[20px]"
                                  />
                                  Express Delivery
                                </div>
                                <span className="text-[14px] font-[500] text-[#000000]">
                                  {item.delivery} SAR
                                </span>
                              </li>
                            </ul>

                            <a
                              href="#"
                              className="flex items-center gap-2 text-[12px] text-[#191919] underline mt-2 font-[500]"
                            >
                              <Image
                                src={icon_personal}
                                alt="file icon"
                                className="w-4 h-4"
                              />
                              {item.file}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-4">
                        <span>Total</span>
                        <span className="text-[14px] font-[500] text-[#000000]">
                          {item.total} SAR
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Summary (Sticky) */}
            <CartSummary cartItems={cartItems} />
          </div>
          <div className="py-10   3xl:px-40 px-[16px]">
            <RecommendedProducts />
          </div>
        </>
      )}
    </div>
  );
}