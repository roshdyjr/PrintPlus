"use client";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslations } from "next-intl";

interface OrderDetails {
  email: string;
  orderNumber: string;
  address: string;
}

const OrderConfirmation = ({ orderDetails }: { orderDetails: OrderDetails }) => {
  const t = useTranslations("OrderConfirmation");

  return (
    <div className="p-6">
      <div>
        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-[#2DD4BF] text-3xl mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("thankYou")}
          </h2>
        </div>

        <p className="text-gray-600 mb-6">
          {t("confirmationSent")}{" "}
          <span className="text-[16px] font-[600] text-[#0F172A]">
            {orderDetails.email}
          </span>
        </p>

        <div>
          <p className="text-gray-600 mb-6">
            {t("orderNumber")}{" "}
            <span className="text-[16px] font-[600] text-[#0F172A]">
              {orderDetails.orderNumber}
            </span>
          </p>
          <p className="text-gray-600 mb-6">{t("trackOrder")}</p>
          <div className="pt-4">
            <h1 className="text-[16px] font-[600] text-[#0F172A]">
              {t("delivery")}
            </h1>
            <p className="text-gray-600">{orderDetails.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;