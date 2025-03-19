import UpdatePasswordForm from "@/components/ProfileComponents/ProfileInfoComponents/UpdatePasswordForm";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Metadata Page Title
export const metadata = {
  title: "Print Plus - Change Password",
};

const page = () => {
  const t = useTranslations("ProfileChangePassword");
  const locale = useLocale();
  return (
    <div className="flex flex-col gap-[39px] text-shadeBlack max-w-[784px] xlg:gap-6 xlg:max-w-[1176px]">
      {/* Navigation Title */}
      <div className="flex items-center gap-2 xlg:gap-3">
        <p className="text-sm xlg:text-[20px]">{t("profileSm")}</p>
        {locale === "ar" ? (
          <FaChevronLeft className="size-[10px] xlg:size-[16px]" />
        ) : (
          <FaChevronRight className="size-[10px] xlg:size-[16px]" />
        )}

        <p className="text-[#475569] text-sm xlg:text-[20px]">
          {t("passwordSm")}
        </p>
      </div>
      {/* Page Header */}
      <p className="text-3xl font-semibold xlg:text-[32px]">{t("profileLg")}</p>

      {/* Change Password Form */}
      <div className="flex flex-col gap-6 xlg:gap-9">
        <hr />
        <UpdatePasswordForm />
        <hr />
      </div>
    </div>
  );
};

export default page;
