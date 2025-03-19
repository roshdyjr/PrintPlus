import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const PasswordDetails = () => {
  const t = useTranslations("ProfileInfo")
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <p className="text-lg font-semibold xlg:text-[24px]">{t("password")}</p>
        <Link href={"/profile/info/password"} className="text-sm text-[#475569] font-semibold xlg:text-[20px]">
          {t("changePassword")}
        </Link>
      </div>
      <div className="text-base font-semibold xlg:text-[20px]">• • • • • • • •</div>
    </div>
  );
};

export default PasswordDetails;
