"use client";
import { FaLock } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";
import OrderConfirmation from "./OrderConfirmation";
 
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
        address: "Ai-Majigid Ai-Haram, Makkah, T2345, Saudi Arabia",
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
      <h2 className="text-xl font-bold text-gray-900 mb-4">Payment</h2>

      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">
          Payment method
        </h3>
        <p className="text-sm text-gray-500">
          Choose your preferred payment method
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          <p className="font-medium">
            The payment has failed. Please check your card details.
          </p>
          <p>
            Try to re-enter your credit card information, use another credit
            card or choose another payment method.
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
            Credit card
            <FaLock className="text-[#94A3B8]" />
          </span>

          {paymentMethod !== "credit-card" && (
            <div className="flex items-center gap-[32px] justify-center">
              <Image
                src="/checkout/icon_mastercard_d.svg"
                alt="Mastercard"
                width={35}
                height={24}
              />
              <Image
                src="/checkout/icon_visa_d.svg"
                alt="Visa"
                width={35}
                height={24}
              />
              <Image
                src="/checkout/icon_mada_d.svg"
                alt="Card Icon"
                width={35}
                height={24}
              />
            </div>
          )}
        </div>

        {paymentMethod === "credit-card" && (
          <div className="space-y-4 pt-3">
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Card holder name
              </label>
              <input
                type="text"
                name="holderName"
                value={cardDetails.holderName}
                onChange={handleInputChange}
                placeholder="Full name"
                className="w-full p-2 border-2 border-[#94A3B8] rounded-[8px]  "
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Card number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border-2 border-[#94A3B8] rounded-[8px]  "
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-700 font-medium mb-1">
                  Expiration date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full p-2 border-2 border-[#94A3B8] rounded-[8px]   "
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-700 font-medium mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full p-2 border-2 border-[#94A3B8] rounded-[8px]  "
                />
              </div>
            </div>

            <div className="flex items-center gap-[32px] pt-2 justify-center">
              <Image
                src="/checkout/icon_mastercard_d.svg"
                alt="Mastercard"
                width={40}
                height={24}
              />
              <Image
                src="/checkout/icon_visa_d.svg"
                alt="Visa"
                width={40}
                height={24}
              />
              <Image
                src="/checkout/icon_mada_d.svg"
                alt="Card Icon"
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
            Apple Pay
          </span>
        </div>
        <Image
          src="/checkout/icon_Pay.svg"
          alt="Apple Pay"
          width={50}
          height={27}
        />
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="bg-black text-white font-medium py-2 px-20 rounded-[32px] flex items-center justify-center hover:bg-gray-800 transition  "
      >
        Place order
      </button>
    </div>
  );
};

export default PaymentForm;
