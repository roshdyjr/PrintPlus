"use client";
import { useState } from "react";
import Image from "next/image";
import ServiceOptions_1 from "/public/ServiceOptions_1.svg";
import ServiceOptions_2 from "/public/ServiceOptions_2.svg";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

interface ServiceOptionsProps {
  installation: {
    visitPrice: number;
    unitPrice: number;
  } | null;
  design: {
    designServiceName: string;
    productDesignPrice: number;
  } | null;
  quantity: number;
}

export default function ServiceOptions({
  installation,
  design,
  quantity,
}: ServiceOptionsProps) {
  const [installSelected, setInstallSelected] = useState(false);
  const [designSelected, setDesignSelected] = useState(false);
  const locale = useLocale();
  const t = useTranslations("ProductDetails");

  return (
    <div className="flex flex-col gap-[35.78px]">
      {/* Installation Service - only show if available */}
      {installation && (
        <div className="flex flex-col gap-[20.87px]">
          <label
            className={`flex items-start py-[17.98px] px-[26.83px] rounded-[6px] cursor-pointer gap-6 ${
              installSelected ? "bg-[#6366F129]" : "bg-[#0000000D]"
            }`}
          >
            <input
              type="checkbox"
              checked={installSelected}
              onChange={() => setInstallSelected(!installSelected)}
              className="hidden"
            />
            <div className="flex items-start w-full gap-3">
              <div
                className={`w-5 h-5 flex items-center justify-center border rounded-md my-auto xlg:w-[32px] xlg:h-[32px] ${
                  installSelected
                    ? "bg-[#6366F1] border-[#6366F1]"
                    : "border-gray-400"
                }`}
              >
                {installSelected && (
                  <span className="text-xs text-white">✔</span>
                )}
              </div>

              <div className="flex-1">
                <p className="flex items-center gap-2 font-semibold xlg:text-[20px]">
                  <Image
                    src={ServiceOptions_1}
                    alt="Installation Service"
                    className="w-[20px] h-[20px] xlg:w-[30px] xlg:h-[30px]"
                  />
                  {t("installationService")}
                </p>
                <p className="text-sm text-[#191919] xlg:text-base">
                  {t("installationDes")}
                </p>
              </div>

              <span className="my-auto font-semibold text-[#191919] xlg:text-[20px]">
                {installation.visitPrice + installation.unitPrice * quantity}{" "}
                {t("currency")}
              </span>
            </div>
          </label>

          <div className="px-4 pb-4 text-gray-700 border-b border-gray-300">
            <p>
              {t("deliveryDes")} {" "}
              <span className="font-semibold">{t("city")}</span>
            </p>
          </div>
        </div>
      )}

      {/* Design Service - only show if available */}
      {design && (
        <label
          className={`flex items-start py-[17.98px] px-[26.83px] rounded-[4px] cursor-pointer ${
            designSelected ? "bg-[#6366F129]" : "bg-[#0000000D]"
          }`}
        >
          <input
            type="checkbox"
            checked={designSelected}
            onChange={() => setDesignSelected(!designSelected)}
            className="hidden"
          />
          <div className="flex items-start w-full gap-3">
            <div
              className={`w-5 h-5 flex items-center justify-center border rounded-md my-auto xlg:w-[32px] xlg:h-[32px] ${
                designSelected
                  ? "bg-[#6366F1] border-[#6366F1]"
                  : "border-gray-400"
              }`}
            >
              {designSelected && <span className="text-xs text-white">✔</span>}
            </div>

            <div className="flex-1">
              <p className="flex items-center gap-2 font-semibold xlg:text-[20px]">
                <Image
                  src={ServiceOptions_2}
                  alt={design.designServiceName}
                  className="w-[20px] h-[20px] xlg:w-[30px] xlg:h-[30px]"
                />
                {design.designServiceName}
              </p>
              <p className="text-sm text-[#191919] xlg:text-base">
                {t("designDes")}
              </p>
            </div>

            <span className="font-semibold text-[#191919] xlg:text-[20px] self-center">
              {design.productDesignPrice} {t("currency")}
            </span>
          </div>
        </label>
      )}
    </div>
  );
}
