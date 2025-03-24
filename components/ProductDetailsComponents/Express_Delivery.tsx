"use client";
import { useLocale } from "next-intl";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { useTranslations } from "use-intl";

interface ExpressDeliveryProps {
  fastDelivery: {
    price: number;
    duration: number;
    isDay: boolean;
    isHour: boolean;
  } | null;
  quantity: number;
}

export default function ExpressDelivery({
  fastDelivery,
  quantity,
}: ExpressDeliveryProps) {
  const [selected, setSelected] = useState(false);
  const locale = useLocale();
  const t = useTranslations("ProductDetails");

  if (!fastDelivery) return null;

  return (
    <div
      className={`flex items-center gap-3 rounded-lg ${
        selected ? " " : "bg-transparent"
      } cursor-pointer transition-all`}
      onClick={() => setSelected(!selected)}
    >
      <div
        className={`w-[31px] h-[31px] flex items-center justify-center rounded-[5px] ${
          selected ? "bg-[#6366F1] text-white" : "border border-gray-400"
        }`}
      >
        {selected && <FaCheck className="w-4 h-4" />}
      </div>

      <TbTruckDelivery className="text-shadeBlack w-[35px] h-[35px]" />

      <div className="flex-1 flex justify-between items-center w-full">
        <span className="text-[20px] font-medium text-shadeBlack">
          {t("expressDelivery")} ({fastDelivery.duration}{" "}
          {fastDelivery.isDay ? t("days") : t("hours")})
        </span>
        <span className="block text-sm font-semibold xlg:text-[20px]">
          {fastDelivery.price} {t("currency")}
        </span>
      </div>
    </div>
  );
}
