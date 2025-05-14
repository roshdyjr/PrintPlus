import React from "react";
import { HiChevronRight } from "react-icons/hi";

export default function Breadcrumbs({ sectionName }: { sectionName: string }) {
  return (
    <nav className="text-sm text-gray-500 mb-4 text-[18px] font-[400] px-6 ">
      <span>Help center</span>{" "}
      <HiChevronRight className="inline-block mx-1 w-[24px] h-[24px] text-black" />{" "}
      <span>Get Started</span>{" "}
      <HiChevronRight className="text-black w-[24px] h-[24px] inline-block mx-1" />{" "}
      <span className="text-indigo-600">{sectionName}</span>
    </nav>
  );
}
