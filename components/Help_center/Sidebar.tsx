"use client";
import React from "react";
import { useLocale } from "next-intl";
import { HelpCategory } from "./types";

const Sidebar = ({ 
  activeSection, 
  setActiveSection,
  categories 
}: { 
  activeSection: string, 
  setActiveSection: (id: string) => void,
  categories: HelpCategory[]
}) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <aside 
      className="w-full sm:w-64 bg-[#6366F10F] p-4 space-y-6 rounded-[24px]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {categories.map((category) => (
        <div key={category.id}>
          <h2 className="font-[500] text-gray-800 mb-2 text-[22px]">
            {category.name}
          </h2>
          <ul className="space-y-1 text-[18px] text-gray-600 font-[300]">
            {category.helpItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id.toString())}
                  className={`w-full text-left hover:text-black py-1 ${
                    activeSection === item.id.toString()
                      ? "text-[#6366F1] font-medium"
                      : ""
                  }`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;