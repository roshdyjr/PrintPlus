"use client";
import CompanyForm from "@/components/AuthComponents/RegisterForms/CompanyForm";
import IndividualForm from "@/components/AuthComponents/RegisterForms/IndividualForm";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("individual"); // Default to "individual"
  const t = useTranslations("Register");
  const locale = useLocale();

  // Function to handle tab switching
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="my-8 md:my-12">
      <div className="mx-[15.5px] md:mx-12 flex flex-col justify-center items-center gap-6">
        {/* Header and tab switching */}
        {/* Form Header */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl text-shadeBlack font-medium">{t("signup")}</h2>
        </div>

        {/* Form Tab Switcher */}
        <div className="w-[179px] h-[44px] rounded-lg flex justify-center items-center">
          {/* Individual Tab */}
          <div
            className={`flex justify-center text-sm items-center border w-[90px] h-[44px] py-[10px] px-[12px] cursor-pointer ${
              activeTab === "individual"
                ? "text-[#4F46E5] bg-[#EEF2FF] border-[#6366F1] border-r-[1px] border-r-[#6366F1]"
                : "bg-transparent text-[#475569]"
            } ${locale ==="ar" ? "rounded-tr-lg rounded-br-lg": "rounded-tl-lg rounded-bl-lg border-r-0 "}`}
            onClick={() => handleTabClick("individual")}
          >
            {t("individual")}
          </div>

          {/* Company Tab */}
          <div
            className={`flex justify-center text-sm items-center border w-[90px] h-[44px] py-[10px] px-[12px] cursor-pointer ${
              activeTab === "company"
                ? "text-[#4F46E5] bg-[#EEF2FF] border-[#6366F1] border-l-[1px] border-l-[#6366F1]"
                : "bg-transparent text-[#475569]"
            } ${locale === "ar" ? "rounded-tl-lg rounded-bl-lg" : "rounded-tr-lg rounded-br-lg border-l-0"}`}
            onClick={() => handleTabClick("company")}
          >
            {t("company")}
          </div>
        </div>

        {/* Conditional Rendering Based on Active Tab */}
        <div className="w-full flex justify-center">
          {activeTab === "company" ? (
            <CompanyForm /> // Render the Company Form component
          ) : (
            <IndividualForm /> // Render the Individual Form component
          )}
        </div>

        {/* Terms and Login Redirect Section */}
        <div className="flex flex-col justify-center items-center gap-8 mt-2">
          <div className="flex gap-2">
            <p className="text-shadeBlack">{t("alreadyRegisterd")}</p>
            <Link href={"/login"} className="text-shadeBlack font-bold">
              {t("login")}
            </Link>
          </div>
          <div>
            <p className="text-sm text-shadeGray">
              {t("registerFooter")}
              <Link href={"/"} className="underline">
                {t("privacyPolicy")}
              </Link>{" "}
              {t("and")}
              <Link href={"/"} className="underline">
                {t("terms")}
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
