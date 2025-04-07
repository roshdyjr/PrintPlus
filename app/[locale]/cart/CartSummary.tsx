"use client";
import { useState } from "react";
import Image from "next/image";
import icon_Add_a_promo from "../../../public/cart/icon_Add_a_promo.svg";
import icon_mada from "../../../public/cart/icon_mada.svg";
import icon_mastercard from "../../../public/cart/icon_mastercard.svg";
import icon_visa from "../../../public/cart/icon_visa.svg";
import icon_Checkout from "../../../public/cart/icon_Checkout.svg";
import { ChevronDown, ChevronUp } from "lucide-react";

type CartItem = {
  total: number;
  delivery: number;
};

type Props = {
  cartItems: CartItem[];
};

export default function CartSummary({ cartItems }: Props) {
  const [showPromo, setShowPromo] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const togglePromo = () => setShowPromo((prev) => !prev);

  const handleApplyPromo = () => {
    if (promoCode.trim() !== "") {
      setPromoApplied(true);
    }
  };

  const calculateSummary = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
    const vat = subtotal * 0.15;
    const delivery = cartItems.reduce((sum, item) => sum + item.delivery, 0);
    const promotion = promoApplied ? -18 : 0;
    const total = subtotal + vat + delivery + promotion;

    return {
      subtotal: subtotal.toFixed(2),
      vat: vat.toFixed(2),
      delivery: delivery.toFixed(2),
      promotion: promotion.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const summary = calculateSummary();

  return (
    <div className="relative lg:min-w-[300px]">
      <div className="sticky top-20 bg-[#F8FAFC] p-4 rounded-xl shadow-md w-full">
        {/* Promo Toggle */}
        <div
          className="flex items-center  gap-2 text-[14px] text-[#0F172A] mb-2 cursor-pointer font-[600]"
          onClick={togglePromo}
        >
          <div className="flex items-center gap-2">
            <Image
              src={icon_Add_a_promo}
              alt="Promo icon"
              className="w-[24px] h-[24px]"
            />
            Add a promo code
          </div>
          {showPromo ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </div>

        {/* Promo Code Input */}
        {showPromo && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="CODEEXAMPLE"
                className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
              />
              <button
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-[#0F172A] text-white rounded-full text-sm"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <p className="text-green-500 text-sm">
                Promocode has been applied
              </p>
            )}
          </div>
        )}

        <hr />

        <div className="space-y-2 text-sm py-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{summary.subtotal} SAR</span>
          </div>
          <div className="flex justify-between">
            <span>VAT (15%)</span>
            <span>{summary.vat} SAR</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{summary.delivery} SAR</span>
          </div>
          {promoApplied && (
            <div className="flex justify-between text-red-500">
              <span>Promotion</span>
              <span>{summary.promotion} SAR</span>
            </div>
          )}
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>{summary.total} SAR</span>
        </div>

        <button className="mt-4 w-full bg-[#0F172A] text-white py-2 rounded-[48px] flex items-center justify-center gap-2">
          <Image src={icon_Checkout} alt="Icon" className="w-5 h-5" />
          Checkout securely
        </button>

        <div className="flex gap-[32px] mt-2 text-xs text-gray-500 justify-center">
          <Image src={icon_mastercard} alt="Mastercard" />
          <Image src={icon_visa} alt="Visa" />
          <Image src={icon_mada} alt="Mada" />
        </div>
      </div>
    </div>
  );
}
