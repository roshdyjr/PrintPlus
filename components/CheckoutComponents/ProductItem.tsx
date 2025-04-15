"use client";
import Image from "next/image";
import icon_Installation from "../../public/cart/icon_Installation.svg";
import icon_Express from "../../public/cart/icon_Express.svg";
import icon_personal from "../../public/cart/icon_personal.svg";
import Product_image from "../../public/cart/Product_image.svg";
import icon_Size_Adjustment from "../../public/cart/icon_Size_Adjustment.svg";

type ProductProps = {
  title: string;
  quantity: number;
  size: string;
  edges: string;
  foilColor: string;
  express?: boolean;
  pdfLink: string;
  total: number;
  installation: number;
  adjustment: number;
  delivery: number;
  arrival?: string;
};

export default function ProductItem({
  title,
  quantity,
  size,
  edges,
  foilColor,
  express = false,
  pdfLink,
  total,
  installation,
  adjustment,
  delivery,
  arrival = "4 Aug, 2025",
}: ProductProps) {
  return (
    <div className="     mb-6 border-b">
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
                <h3 className="text-[16px] font-[600] mt-2">{title}</h3>
                <div className="text-[14px] font-[400] text-[#475569] flex-col gap-8">
                  <p className=" ">Quantity: {quantity}</p>
                  <p className=" ">Size: {size}</p>
                  <p className=" ">Edges: {edges}</p>
                  <p className=" ">Foil Color: {foilColor}</p>
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
                      {installation} SAR
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
                      {adjustment} SAR
                    </span>
                  </li>
                  {express && (
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
                        {delivery} SAR
                      </span>
                    </li>
                  )}
                </ul>

                <a
                  href={pdfLink}
                  className="flex items-center gap-2 text-[12px] text-[#191919] underline mt-2 font-[500]"
                >
                  <Image
                    src={icon_personal}
                    alt="file icon"
                    className="w-4 h-4"
                  />
                  {pdfLink.split("/").pop()}
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span className="text-[14px] font-[500] text-[#000000]">
              {total} SAR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
