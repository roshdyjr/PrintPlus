"use client";
import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useLocale } from "next-intl";
import { fetchTermsAndConditions } from "./api";

export default function Terms_Conditions() {
  const locale = useLocale();
  const [termsHtml, setTermsHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTerms = async () => {
      try {
        setLoading(true);
        const html = await fetchTermsAndConditions(locale);
        if (html) {
          setTermsHtml(html);
        } else {
          setError("Failed to load terms and conditions");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadTerms();
  }, [locale]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 mt-8 mb-8 text-gray-800">
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 mt-8 mb-8 text-gray-800">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-8 mb-8 text-gray-800">
      <nav className="text-sm text-gray-500 mb-4">
        <ol className="list-reset flex items-center">
          <li className="text-black font-semibold">
            {locale === "ar" ? "الصفحة الرئيسية" : "Home"}
          </li>
          <li className="mx-2 flex items-center text-gray-400">
            <FaChevronRight size={16} />
          </li>
          <li>
            {locale === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
          </li>
        </ol>
      </nav>
      <h1 className="text-2xl md:text-[40px] font-bold mb-6">
        {locale === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
      </h1>
      
      <div 
        className="prose max-w-none" 
        dangerouslySetInnerHTML={{ __html: termsHtml }} 
        dir={locale === "ar" ? "rtl" : "ltr"}
      />
    </div>
  );
}