import Image from "next/image";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Order } from "@/types/Orders";
import OrderStatusTimeline from "@/components/ProfileComponents/OrderStatusTimeline";
import { useLocale, useTranslations } from "next-intl";

// Metadata Page Title
export const metadata = {
  title: "Print Plus - Order Details",
};

// Placeholder Orders Array
const orders: Order[] = [
  {
    id: "240810ugjyxkm1",
    status: "Shipped",
    products: [
      {
        productImage: "/productImg1.svg",
        quantity: 50,
        size: '2 "x 3.5"',
        color: "فضي",
        edges: "دائرية",
        status: "delivered",
        price: "225",
      },
      {
        productImage: "/productImg2.svg",
        quantity: 100,
        size: '2 "x 3.5"',
        color: "ذهبي",
        edges: "مستقيمة",
        status: "delivered",
        price: "50",
      },
    ],
    totalPrice: 128,
    deliveryDate: "4 Aug, 2025",
  },
  {
    id: "240810ugjyxkm2",
    status: "Delivered",
    products: [
      {
        productImage: "/productImg2.svg",
        quantity: 75,
        size: '2 "x 3.5"',
        color: "برونزي",
        edges: "مستقيمة",
        status: "delivered",
        price: "80",
      },
      {
        productImage: "/productImg1.svg",
        quantity: 75,
        size: '2 "x 3.5"',
        color: "برونزي",
        edges: "مستقيمة",
        status: "returned",
        price: "140",
      },
    ],
    totalPrice: 120,
    deliveryDate: "2 Jun, 2025",
  },
  {
    id: "240810ugjyxkm3",
    status: "Cancelled",
    products: [
      {
        productImage: "/productImg1.svg",
        quantity: 50,
        size: '2 "x 3.5"',
        color: "فضي",
        edges: "دائرية",
        status: "cancelled",
        price: "225",
      },
    ],
    totalPrice: 225,
    deliveryDate: "4 Aug, 2025",
  },
];

const OrderDetailsPage = ({ params }: { params: { id: string } }) => {
  // Find the order by ID
  const order = orders.find((order) => order.id === params.id);
  const t = useTranslations("ProfileOrderDetails");
  const locale = useLocale();

  if (!order) {
    return <div>{t("noOrder")}</div>;
  }

  return (
    <div className="flex flex-col gap-12 text-shadeBlack me-0 xl:me-[148px] xlg:me-[222px] xlg:gap-[72px]">
      {/* Breadcrumb Navigation */}
      <div className="flex md:justify-between">
        <div className="flex flex-col gap-6 xlg:gap-9">
          <div className="flex items-center gap-2">
            <p className="text-sm xlg:text-[20px]">{t("orders")}</p>
            {locale === "ar" ? (
              <FaChevronLeft className="size-[10px] xlg:size-[16px]" />
            ) : (
              <FaChevronRight className="size-[10px] xlg:size-[16px]" />
            )}
            <p className="text-[#475569] text-sm xlg:text-[20px]">
              {t("order")} #{params.id}
            </p>
          </div>
          {/* Display the actual delivery date or cancellation message */}
          <div className="text-xl font-semibold xlg:text-[32px]">
            {order.status === "Cancelled" ? (
              <div className="flex flex-col gap-3 max-w-[383px] xlg:max-w-[575px]">
                <p className="font-semibold text-3xl xlg:text-[32px]">
                  {t("cancellationRequest")}
                </p>
                <p className="text-black font-normal text-base xlg:text-[20px] xlg:leading-[36px]">
                  {t("cancellationMessage")}
                </p>
              </div>
            ) : order.status === "Delivered" ? (
              `${t("delivered")} ${order.deliveryDate}`
            ) : (
              `Estimated delivery: ${order.deliveryDate}`
            )}
          </div>
        </div>
        {/* Cancel Order Button (only show if status is not "Delivered" or "Cancelled") */}
        {order.status !== "Delivered" && order.status !== "Cancelled" && (
          <button className="hidden md:flex items-center gap-2 self-end xlg:gap-3">
            <Image
              src={"/cancelRed.svg"}
              alt="cancel"
              width={20}
              height={20}
              className="xlg:w-[30px] xlg:h-[30px]"
            />
            <p className="font-semibold text-[#BE123C] text-sm xlg:text-[20px]">
              {t("cancelOrder")}
            </p>
          </button>
        )}
      </div>

      {/* Order Details */}
      <div className="flex flex-col md:flex-row items-start gap-4 xlg:gap-6">
        <div className="flex flex-col gap-14 xlg:gap-[84px]">
          <div className="flex flex-col gap-6">
            {/* Replace OrderTimeline with OrderStatusTimeline */}
            <OrderStatusTimeline
              status={order.status}
              deliveryDate={order.deliveryDate}
            />
          </div>
          <div className="flex flex-col gap-4 xlg:gap-6">
            <hr />
            {/* Shipping Address */}
            <div className="flex flex-col gap-2 xlg:gap-3">
              <p className="font-semibold xlg:text-[24px]">{t("shippingAddress")}</p>
              <div className="flex flex-col gap-4 xlg:gap-6">
                <p className="xlg:text-[20px] xlg:max-w-[576px]">
                  Aisha Al-Fahad, 78 Al-Masjid Road, Jeddah, 21442, Kingdom of
                  Saudi Arabia
                </p>
                <hr />
              </div>
            </div>
            {/* Payment Method */}
            <div className="flex flex-col gap-2 xlg:gap-3">
              <p className="font-semibold xlg:text-[24px]">{t("paymentMethod")}</p>
              <p className="xlg:text-[20px]">Mastercard ending in 4242</p>
            </div>
            <hr />
          </div>
        </div>
        {/* Products List */}
        <div className="md:min-w-[384px] border border-cardBorder rounded-lg px-6 py-[22px] flex flex-col gap-[10px] xlg:gap-[15px] xlg:border-[1.5px] xlg:rounded-[12px] xlg:py-[33px] xlg:px-9 xlg:w-[576px]">
          <div className="flex flex-col gap-4 xlg:gap-6">
            <div className="flex flex-col gap-6">
              {/* Product list header */}
              <div className="flex flex-col gap-4 xlg:gap-6">
                <div className="flex flex-col gap-2 xlg:gap-[6px]">
                  <p className="text-lg font-semibold xlg:text-[24px] xlg:h-[42px]">
                    {t("order")} #{params.id}
                  </p>
                  <p className="text-sm xlg:text-[20px]">
                    {t("ordered")} {order.deliveryDate}
                  </p>
                  {/* Cancel Order Button (only show if status is not "Delivered" or "Cancelled") */}
                  {order.status !== "Delivered" &&
                    order.status !== "Cancelled" && (
                      <button className="flex md:hidden items-center gap-2">
                        <Image
                          src={"/cancelRed.svg"}
                          alt="cancel"
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold text-[#BE123C] text-sm">
                          {t("cancelOrder")}
                        </p>
                      </button>
                    )}
                </div>
                <hr />
              </div>
              {/* Product list cards */}
              {order.products.map((product, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-[10px] xlg:gap-[15px]">
                      {/* Product Image */}
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
                        <p className="text-nowrap xlg:text-[24px]">
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
                    <p className="font-semibold self-center xlg:text-[24px]">
                      {product.price} {t("currency")}
                    </p>
                  </div>
                  {/* Add <hr /> after each product except the last one */}
                  {index !== order.products.length - 1 && <hr />}
                </React.Fragment>
              ))}
              {/* Bill details */}
              <div className="flex flex-col gap-4 xlg:gap-6">
                <hr />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 text-sm xlg:gap-3 xlg:text-[20px]">
                    <p>{t("subtotal")}</p>
                    <p>{t("vat")}</p>
                    <p>{t("delivery")}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm xlg:gap-3 xlg:text-[20px]">
                    <p>40 {t("currency")}</p>
                    <p>6 {t("currency")}</p>
                    <p>12 {t("currency")}</p>
                  </div>
                </div>
                <hr />
              </div>
              {/* Total Payment */}
              <div className="flex justify-between items-center">
                <p className="xlg:text-[24px]">{t("total")}</p>
                <p className="font-semibold text-2xl xlg:text-[32px]">
                  56.34 {t("currency")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
