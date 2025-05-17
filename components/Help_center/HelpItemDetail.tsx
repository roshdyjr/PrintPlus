"use client";
import React from "react";
import { useLocale } from "next-intl";
import { HelpItem } from "./types";

const HelpItemDetail = ({ item }: { item: HelpItem }) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <main 
      className="flex-1 bg-white rounded-lg p-6 text-sm"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h2 className="text-xl font-semibold mb-4">{item.title}</h2>
      <div 
        className="prose max-w-none" 
        dangerouslySetInnerHTML={{ __html: item.description }} 
      />
    </main>
  );
};

export default HelpItemDetail;