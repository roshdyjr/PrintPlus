
"use client";

import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useLocale } from "next-intl";

export default function Privacy_Policy() {
  const locale = useLocale();
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await fetch(
          "https://printplus.print-dev.com/user-api/public/privacy",
          {
            headers: {
              "Accept-Language": locale,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch privacy policy");
        }

        const data = await response.json();
        setPrivacyPolicy(data.data.privacyPolicy);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, [locale]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-gray-800">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
          {[...Array(9)].map((_, i) => (
            <div key={i} className="mb-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-gray-800">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-gray-800">
      <nav className="text-sm text-gray-500 mb-4">
        <ol className="list-reset flex items-center">
          <li className="text-black font-semibold">
            {locale === "ar" ? "الرئيسية" : "Home"}
          </li>
          <li className="mx-2 flex items-center text-gray-400">
            <FaChevronRight size={16} />
          </li>
          <li>{locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}</li>
        </ol>
      </nav>
      <h1 className="text-2xl md:text-[40px] font-bold mb-6">
        {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
      </h1>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: privacyPolicy }}
      />
    </div>
  );
}