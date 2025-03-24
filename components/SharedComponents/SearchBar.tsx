"use client"; // Ensure this is a client component
import { useLocale, useTranslations } from "next-intl"; // Import hooks
import Image from "next/image";
import React from "react";

const SearchBar = () => {
  // Get the current locale and translations
  const locale = useLocale(); // Current locale
  const t = useTranslations("SearchBar"); // Translations for the SearchBar

  return (
    <div className="relative w-full h-12 border border-[#CBD5E1] rounded-[28px] flex justify-start items-center xlg:h-[60px] xlg:border-[1.5px] xlg:rounded-[42px]">
      <div
        className={`absolute top-3 flex items-center gap-2 w-[95%] xlg:gap-3 xlg:left-[15px] ${
          locale === "ar" ? "right-[10px]" : "left-[10px]"
        }`}
      >
        <Image
          src={"/search.svg"}
          alt="search"
          width={20}
          height={20}
          className="xlg:w-[30px] xlg:h-[30px]"
        />
        <input
          type="text"
          placeholder={t("placeholder")} // Translated placeholder text
          className="w-full outline-none xlg:placeholder:text-[20px] bg-white"
        />
      </div>
    </div>
  );
};

export default SearchBar;