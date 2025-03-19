import { Order } from "@/types/Orders";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const t = useTranslations("ProfileOrders");
  return (
    <div className="w-full rounded-lg border border-cardBorder flex flex-col gap-6 px-4 py-6 text-shadeBlack lg:px-8 xlg:border-[1.5px] xlg:rounded-[12px] xlg:py-9 xlg:px-12 xlg:gap-9">
      {/* Card Header */}
      <div className="w-full flex flex-col gap-4 lg:flex-row items-center justify-between">
        {/* Status, Order and Total*/}
        <div className="flex flex-col gap-4 lg:flex-row items-center justify-between w-full lg:w-[499px]">
          {/* Status */}
          <div className="flex justify-between w-full lg:w-fit lg:flex-col lg:gap-1 xlg:gap-[6px]">
            <p className="font-semibold xlg:text-xl">{t("status")}</p>
            <p className="xlg:text-xl">{order.status}</p>
          </div>
          {/* Order Number */}
          <div className="flex justify-between w-full lg:w-fit lg:flex-col lg:gap-1 xlg:gap-[6px]">
            <p className="font-semibold xlg:text-xl">{t("orderNumber")}</p>
            <p className="xlg:text-xl">#{order.id}</p>
          </div>
          {/* Total */}
          <div className="flex justify-between w-full lg:w-fit lg:flex-col lg:gap-1 xlg:gap-[6px]">
            <p className="font-semibold xlg:text-xl">{t("total")}</p>
            <p className="xlg:text-xl">
              {order.totalPrice} {t("currency")}
            </p>
          </div>
        </div>
        {/* Details Button */}
        <Link
          href={`/profile/orders/${order.id}`}
          className="w-full lg:w-fit flex justify-center items-center"
        >
          <button className="w-full lg:w-[110px] h-[48px] rounded-lg px-3 py-[10px] bg-[#F1F5F9] flex justify-center items-center xlg:h-[72px] xlg:rounded-[12px] xlg:py-[15px] xlg:px-[18px] xlg:w-[143px]">
            <p className="font-semibold text-nowrap xlg:text-[20px]">
              {t("details")}
            </p>
          </button>
        </Link>
      </div>
      <hr />

      {/* Card Body */}
      <div className="flex flex-col gap-4 xlg:gap-6">
        {/* ✅ Show cancellation message if status is "cancelled" */}
        {order.status === "Cancelled" ? (
          <div className="flex flex-col gap-2 max-w-[718px] xlg:max-w-[1078px]">
            <p className="font-semibold xlg:text-[21px]">
              {t("cancellationRequest")}
            </p>
            <p className="text-[#475569] text-sm xlg:text-[20px] xlg:leading-[36px]">
              {t("cancellationMessage")}
            </p>
          </div>
        ) : (
          <p className="font-semibold xlg:text-[24px]">
            {order.status === "Delivered"
              ? `${t("delivered")} : ${order.deliveryDate}`
              : `${t("estimatedDelivery")}: ${order.deliveryDate}`}
          </p>
        )}

        {/* Products List */}
        {order.products.map((product, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-[10px] xlg:gap-[15px]">
                {/* Product Image with Blur for Returned */}
                <Image
                  src={product.productImage}
                  alt="productImg"
                  width={70}
                  height={90}
                  className={`self-center rounded-[6px] ${
                    product.status === "returned" ? "opacity-50" : ""
                  } xlg:w-[105px] xlg:h-[135px]`}
                />
                {/* Product Details */}
                <div className="flex flex-col gap-[2.67px] xlg:gap-1">
                  <p className="font-semibold xlg:text-[24px] xlg:font-normal">
                    Gold business cards
                  </p>
                  <p className="text-[#475569] text-sm xlg:text-[20px] xlg:h-[30px] flex items-center">
                    {t("quantity")}: {product.quantity}
                  </p>
                  <p className="text-[#475569] text-sm xlg:text-[20px] xlg:h-[30px] flex items-center">
                    {t("size")}: {product.size}
                  </p>
                  <p className="text-[#475569] text-sm xlg:text-[20px] xlg:h-[30px] flex items-center">
                    {t("edges")}: {product.edges}
                  </p>
                  <p className="text-[#475569] text-sm xlg:text-[20px] xlg:h-[30px] flex items-center">
                    {t("foilColor")}: {product.color}
                  </p>
                </div>
              </div>
              <p className="font-semibold self-center text-black xlg:text-[24px]">
                {product.price} {t("currency")}
              </p>
            </div>
            {/* Add <hr /> after each product except the last one */}
            {index !== order.products.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
