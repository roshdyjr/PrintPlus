"use client";
import { FaLock } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";
import OrderConfirmation from "./OrderConfirmation";
import InputField from "@/components/SharedComponents/InputField";
import { useTranslations } from "next-intl";

interface CardDetails {
  holderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface OrderDetails {
  orderNumber: string;
  email: string;
  address: string;
}

const PaymentForm = () => {
  const t = useTranslations();
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    holderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (
      cardDetails.holderName &&
      cardDetails.cardNumber &&
      cardDetails.expiryDate &&
      cardDetails.cvv
    ) {
      setOrderDetails({
        orderNumber: "2TB4591YF123",
        email: "emailexample@gmail.com",
        address: t("Checkout.sampleAddress"),
      });
      setOrderSuccess(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const toggleCreditCard = () => {
    setPaymentMethod(paymentMethod === "credit-card" ? "" : "credit-card");
  };

  if (orderSuccess && orderDetails) {
    return <OrderConfirmation orderDetails={orderDetails} />;
  }

  return (
    <div className="md:p-6 bg-white">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {t("Checkout.payment")}
      </h2>

      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">
          {t("Checkout.paymentMethod")}
        </h3>
        <p className="text-sm text-gray-500">
          {t("Checkout.choosePaymentMethod")}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          <p className="font-medium">
            {t("Checkout.paymentFailed")}
          </p>
          <p>
            {t("Checkout.paymentFailedInstructions")}
          </p>
        </div>
      )}

      {/* Credit Card Method */}
      <div className="border rounded-[12px] p-4 mb-4 border-[#b5b2b2] bg-[#F8FAFC]">
        <div
          className="flex items-center cursor-pointer justify-between"
          onClick={toggleCreditCard}
        >
          <span className="text-[16px] font-[600] text-[#0F172A] mr-2 flex items-center gap-2">
            {t("Checkout.creditCard")}
            <FaLock className="text-[#94A3B8]" />
          </span>

          {paymentMethod !== "credit-card" && (
            <div className="flex items-center gap-[32px] justify-center">
              <Image
                src="/checkout/icon_mastercard_d.svg"
                alt={t("Checkout.mastercard")}
                width={35}
                height={24}
              />
              <Image
                src="/checkout/icon_visa_d.svg"
                alt={t("Checkout.visa")}
                width={35}
                height={24}
              />
              <Image
                src="/checkout/icon_mada_d.svg"
                alt={t("Checkout.cardIcon")}
                width={35}
                height={24}
              />
            </div>
          )}
        </div>

        {paymentMethod === "credit-card" && (
          <div className="space-y-4 pt-3">
            <InputField
              id="holderName"
              name="holderName"
              type="text"
              placeholder={t("Checkout.fullNamePlaceholder")}
              value={cardDetails.holderName}
              onChange={handleInputChange}
              className="[&>div>input]:w-full [&>div>input]:border-2 [&>div>input]:border-[#94A3B8] [&>div>input]:rounded-[8px] [&>div>input]:p-2 [&>div>input]:focus:outline-none"
              label={t("Checkout.cardHolderName")}
            />

            <InputField
              id="cardNumber"
              name="cardNumber"
              type="text"
              placeholder={t("Checkout.cardNumberPlaceholder")}
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              className="[&>div>input]:w-full [&>div>input]:border-2 [&>div>input]:border-[#94A3B8] [&>div>input]:rounded-[8px] [&>div>input]:p-2 [&>div>input]:focus:outline-none"
              label={t("Checkout.cardNumber")}
            />

            <div className="flex gap-4">
              <div className="flex-1">
                <InputField
                  id="expiryDate"
                  name="expiryDate"
                  type="text"
                  placeholder={t("Checkout.expiryDatePlaceholder")}
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                  className="[&>div>input]:w-full [&>div>input]:border-2 [&>div>input]:border-[#94A3B8] [&>div>input]:rounded-[8px] [&>div>input]:p-2 [&>div>input]:focus:outline-none"
                  label={t("Checkout.expiryDate")}
                />
              </div>
              <div className="flex-1">
                <InputField
                  id="cvv"
                  name="cvv"
                  type="text"
                  placeholder={t("Checkout.cvvPlaceholder")}
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  className="[&>div>input]:w-full [&>div>input]:border-2 [&>div>input]:border-[#94A3B8] [&>div>input]:rounded-[8px] [&>div>input]:p-2 [&>div>input]:focus:outline-none"
                  label={t("Checkout.cvv")}
                />
              </div>
            </div>

            <div className="flex items-center gap-[32px] pt-2 justify-center">
              <Image
                src="/checkout/icon_mastercard_d.svg"
                alt={t("Checkout.mastercard")}
                width={40}
                height={24}
              />
              <Image
                src="/checkout/icon_visa_d.svg"
                alt={t("Checkout.visa")}
                width={40}
                height={24}
              />
              <Image
                src="/checkout/icon_mada_d.svg"
                alt={t("Checkout.cardIcon")}
                width={40}
                height={24}
              />
            </div>
          </div>
        )}
      </div>

      {/* Apple Pay */}
      <div
        className={`border rounded-lg p-4 mb-6 cursor-pointer flex items-center justify-between ${
          paymentMethod === "apple-pay" ? "border-black" : "border-gray-300"
        }`}
        onClick={() => setPaymentMethod("apple-pay")}
      >
        <div className="flex items-center">
          <span className="text-[16px] font-[600] text-[#0F172A] mr-2">
            {t("Checkout.applePay")}
          </span>
        </div>
        <Image
          src="/checkout/icon_Pay.svg"
          alt={t("Checkout.applePay")}
          width={50}
          height={27}
        />
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="bg-black text-white font-medium py-2 px-20 rounded-[32px] flex items-center justify-center hover:bg-gray-800 transition w-full md:w-auto"
      >
        {t("Checkout.placeOrder")}
      </button>
    </div>
  );
};

export default PaymentForm;