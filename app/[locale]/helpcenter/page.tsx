"use client";
import React, { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { HelpCategory } from "@/components/Help_center/types";
import Breadcrumbs from "@/components/Help_center/Breadcrumbs";
import Sidebar from "@/components/Help_center/Sidebar";
import HelpItemDetail from "@/components/Help_center/HelpItemDetail";
import SearchBar from "@/components/Help_center/SearchBar";
 
export default function HelpCenter() {
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState<string>("1");
  const [categories, setCategories] = useState<HelpCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHelpData = async () => {
      try {
        const response = await fetch(
          "https://printplus.print-dev.com/user-api/public/help",
          {
            headers: {
              "Accept-Language": locale,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch help data");
        }

        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
          if (data.data.length > 0 && data.data[0].helpItems.length > 0) {
            setActiveSection(data.data[0].helpItems[0].id.toString());
          }
        } else {
          throw new Error(data.message || "Failed to load help content");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHelpData();
  }, [locale]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  const currentItem = categories
    .flatMap((category) => category.helpItems)
    .find((item) => item.id.toString() === activeSection);

  return (
    <div className="min-h-screen pb-10">
      <SearchBar />
      <div className="flex flex-col sm:flex-row max-w-7xl mx-auto mt-6 px-4 gap-6">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          categories={categories}
        />
        <div className="flex-1">
          {currentItem && (
            <>
              <Breadcrumbs sectionName={currentItem.title} />
              <HelpItemDetail item={currentItem} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}