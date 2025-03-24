"use client";
import { useState } from "react";
import Express_Delivery from "./Express_Delivery";
import FileUpload from "./FileUpload";
import ServiceOptions from "./ServiceOptions";
import { FaStar } from "react-icons/fa";
import Dropdown from "./Dropdown";
import Image from "next/image";
import Size_1 from "/public/Size_1.svg";
import Size_2 from "/public/Size_2.svg";
import Edges_1 from "/public/Edges_1.svg";
import Edges_2 from "/public/Edges_2.svg";
import PaperTypeSelector from "./PaperTypeSelector";
import { FaRegCommentDots, FaRegUser } from "react-icons/fa";
import CustomButton from "../SharedComponents/CustomButton";

// Define the type for the file object
type FileObject = {
  name: string;
  size: string;
  type: string;
  status: "success" | "error";
};

export default function BusinessCardDetails() {
  // State for selected color
  const [color, setColor] = useState("Blue");

  // State for selected quantity
  const [quantity, setQuantity] = useState("50 Card");

  // State for product price
  const [price] = useState(35.53);

  // State for uploaded files
  const [files] = useState<FileObject[]>([]);

  // State for selected gilding color
  const [gildingColor, setGildingColor] = useState("Gold");

  // State for selected edges
  const [edges, setEdges] = useState("Rounded");

  // State for selected size
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="w-full xlg:min-w-[568px] flex flex-col gap-8">
      {/* Product Title and Ratings Section (Hidden on Mobile) */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-[13.42px]">
          <h1 className="text-shadeBlack font-semibold text-[22px] xlg:text-[24px]">
            Gold business cards
          </h1>
          <div className="flex items-center gap-3">
            {/* Rating Badge */}
            <div className="flex items-center bg-[#FBF3EA] text-[#f59f0bd1] px-2 py-1 rounded-full text-sm font-semibold">
              <FaStar className="w-[14px] h-[14px] mr-1" />
              4.8
            </div>

            {/* Reviews Badge */}
            <div className="flex items-center bg-[#EDF0F8] text-[#3A4980] px-2 py-1 rounded-full text-sm font-semibold">
              <FaRegCommentDots className="w-[14px] h-[14px] mr-1" />
              67 Reviews
            </div>

            {/* Q&A Badge */}
            <div className="flex items-center bg-[#EAF7FB] text-[#3B99D4] px-2 py-1 rounded-full text-sm font-semibold">
              <FaRegUser className="w-[14px] h-[14px] mr-1" />
              Questions and answers (5)
            </div>
          </div>
        </div>
      </div>
      <hr />

      {/* Product Configuration Section */}
      <div className="flex flex-col gap-[29.81px]">
        {/* Size Selection */}
        <div className="flex flex-col gap-4">
          <label className="block text-[20px] font-[600] text-[#0F172A]">
            Size
          </label>
          <div className="flex gap-4">
            {[
              { size: "2 x 3.5", text: "Standard" },
              { size: "5.5 x 3.5", text: "Square" },
            ].map(({ size, text }) => (
              <button
                key={size}
                className={`flex flex-col items-start w-[197px] h-[164px] border-2 rounded-[13.26px] text-[14px] p-[10px] ${
                  selectedSize === size
                    ? "border-[#6366F1] text-[#6366F1] bg-[#fff]"
                    : "border-gray-300 text-[#94A3B8]"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                <Image
                  src={size === "2 x 3.5" ? Size_1 : Size_2}
                  alt={size}
                  className="self-center mb-2"
                />

                <span className="self-start text-left font-semibold text-[16px]">
                  {text}
                </span>
                <span
                  className={`text-[14px] font-[400] text-left self-start  ${
                    selectedSize === size ? "text-[#6366F1] " : "text-[#0F172A]"
                  }`}
                >
                  {size}
                </span>
              </button>
            ))}
          </div>
        </div>

        <hr />

        {/* Color Selection */}
        <div className="flex flex-col gap-4">
          <label className="block text-[20px] font-semibold text-shadeBlack">
            Color
          </label>
          <div className="flex justify-center gap-4">
            {["Orange", "Cyan", "Green", "Pink"].map((c) => (
              <div className="flex flex-col items-center" key={c}>
                <div
                  className={`p-[6px] rounded-full border-[3px] cursor-pointer ${
                    color === c
                      ? "border-[#6366F1] shadow-lg"
                      : "border-[#D7DADD]"
                  }`}
                  onClick={() => setColor(c)}
                >
                  <div
                    className="h-[37px] w-[37px] rounded-full"
                    style={{ backgroundColor: c.toLowerCase() }}
                  />
                </div>
                {color === c && (
                  <div className="mt-1 text-[14px] font-medium text-[#0F172A]">
                    {c}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <hr />

        {/* Paper Type Selection */}
        <PaperTypeSelector />

        <hr />

        {/* Edges Selection */}
        <div className="flex flex-col gap-4">
          <label className="block text-[20px] font-semibold text-shadeBlack">
            Edges
          </label>
          <div className="flex flex-col gap-[9.66px] md:flex-row">
            {["Sharp", "Curved"].map((c) => (
              <button
                key={c}
                className={`flex items-center gap-5 p-[10.87px] border-2 rounded-[13px] w-full ${
                  edges === c ? "border-[#6366F1] bg-[#fff]" : "border-gray-300"
                }`}
                onClick={() => setEdges(c)}
              >
                <Image
                  src={c === "Sharp" ? Edges_1 : Edges_2}
                  alt={c}
                  className="w-[77px] h-[77px]"
                />
                <span
                  className={`mt-2 text-[16px] font-[600] ${
                    edges === c ? "text-[#6366F1]" : "text-[#1E2939]"
                  }`}
                >
                  {c}
                </span>
              </button>
            ))}
          </div>
        </div>

        <hr />

        {/* Gilding Color Selection */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="block text-[16px] font-semibold text-shadeBlack xlg:text-[20px]">
              Gilding Color
            </label>
            <div className="flex gap-[17.89px]">
              {["Gold", "Silver"].map((c) => (
                <button
                  key={c}
                  className={`py-[14.91px] px-[23.85px] border-2 rounded-[29.81px] text-[14px] text-[#94A3B8] bg-[#F8FAFC] font-semibold w-[118px] xlg:w-[176px] xlg:h-[59.81px] xlg:text-[20px] ${
                    gildingColor === c
                      ? "border-[#6366F1] text-[#6366F1] bg-[#fff]"
                      : "border-gray-300"
                  }`}
                  onClick={() => setGildingColor(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <hr />
      </div>

      {/* Quantity Dropdown */}
      <div>
        <Dropdown
          label="Quantity"
          options={["50 Card", "100 Card", "200 Card"]}
          selected={quantity}
          onSelect={setQuantity}
        />
      </div>
      <hr />

      {/* Express Delivery and Service Options */}
      <div className="flex flex-col gap-[35.78px]">
        <Express_Delivery />
        <hr />
        <ServiceOptions />
        <hr />
      </div>

      {/* File Upload and Price Section */}
      <div className="flex flex-col gap-[35.78px] pb-4 lg:pb-[47.7px]">
        <FileUpload />
        {/* Uploaded Files List */}

        {files && (
          <ul>
            {files.map((file, index) => (
              <li key={index} className="text-sm">
                {file.name}
              </li>
            ))}
          </ul>
        )}

        <hr />

        {/* Product Price */}
        <p className="text-[20px] font-bold text-center text-shadeBlack xlg:text-[36px]">
          {price} SAR
        </p>

        {/* Add to Cart Button */}
        <CustomButton
          label="Add to cart"
          className="!w-[314px] !h-[44px] xlg:!w-[467px] xlg:!h-[65.81px] self-center"
          icon="/Cart-plus.svg"
        />
      </div>
    </div>
  );
}
