"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { FaChevronUp } from "react-icons/fa";

const ToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const t = useTranslations("CategoriesList");

  return (
    <button
      className="bg-[#0F172A] px-[17px] py-[10px] flex items-center gap-[6px] text-white rounded-[23px] xlg:py-[15px] xlg:px-[25.5px] xlg:rounded-[34.5px]"
      onClick={scrollToTop}
    >
      <FaChevronUp />
      <p className="font-medium text-sm xlg:font-semibold xlg:text-lg">
        {t("toTop")}
      </p>
    </button>
  );
};

export default ToTopButton;
