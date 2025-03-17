"use client";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import CustomButton from "../SharedComponents/CustomButton";

interface ProdectSidebarProps {
  onClose: () => void;
}

export default function ProdectSidebar({ onClose }: ProdectSidebarProps) {
  const categories = [
    {
      name: "Large products and boards",
      subItems: ["Business Cards", "Letterhead", "Envelop"],
    },
    { name: "Clothing" },
    { name: "Albums" },
    { name: "Stationery" },
    { name: "Packaging & Labels" },
    { name: "Gifts" },
    { name: "Ink & Printers" },
  ];

  const [expanded, setExpanded] = useState<number | null>(0);

  const handleExpand = (index: number) => {
    setExpanded((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full py-5">
      <div className="flex justify-between items-center mb-4 px-6">
        <button className="text-blue-500">Reset</button>
        <div className="flex items-center gap-4">
          <h2 className="font-semibold">Products</h2>
          <FaArrowLeft
            onClick={onClose}
            className="cursor-pointer text-lg" 
          />
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-2 px-1 mt-5">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`border-b-[1px] py-3 ${
              expanded === index ? "rounded-[0px]" : "rounded-[15px]"
            }`}
          >
            <button
              onClick={() => handleExpand(index)}
              className="w-full flex justify-between items-center px-5"
            >
              <span className="text-xl">
                {expanded === index ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </span>
              <span>{cat.name}</span>
            </button>

            {cat.subItems && expanded === index && (
              <div className="pl-4 flex flex-col gap-1 mt-2 items-end">
                {cat.subItems.map((sub, subIndex) => (
                  <span key={subIndex} className="text-sm text-gray-600">
                    {sub}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-36 w-[314px] mx-auto">
        <CustomButton label="View 12 results" className="" type="submit" />
      </div>
    </div>
  );
}
