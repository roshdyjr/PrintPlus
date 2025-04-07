"use client";
import Image from "next/image";
import icon_Add_a_promo from "../../../public/cart/icon_Add_a_promo.svg";
import icon_mada from "../../../public/cart/icon_mada.svg";
import icon_mastercard from "../../../public/cart/icon_mastercard.svg";
import icon_visa from "../../../public/cart/icon_visa.svg";
import icon_Checkout from "../../../public/cart/icon_Checkout.svg";

type CartItem = {
  total: number;
  delivery: number;
};

type Props = {
  cartItems: CartItem[];
};

export default function CartSummary({ cartItems }: Props) {
  const calculateSummary = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
    const vat = subtotal * 0.15;
    const delivery = cartItems.reduce((sum, item) => sum + item.delivery, 0);
    const total = subtotal + vat + delivery;

    return {
      subtotal: subtotal.toFixed(2),
      vat: vat.toFixed(2),
      delivery: delivery.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const summary = calculateSummary();

  return (
    <div className="relative lg:min-w-[300px]">
      <div className="sticky top-20 bg-[#F8FAFC] p-4 rounded-xl shadow-md w-full">
        <div className="flex items-center gap-2 text-[14px] text-[#0F172A] mb-2 cursor-pointer font-[600]">
          <Image
            src={icon_Add_a_promo}
            alt="Promo icon"
            className="w-[24px] h-[24px]"
          />
          Add a promo code
        </div>
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

        <div className="flex gap-[32px] mt-2 text-xs text-gray-500 justify-center ">
          <Image src={icon_mastercard} alt="Mastercard" />
          <Image src={icon_visa} alt="Visa" />
          <Image src={icon_mada} alt="Mada" />
        </div>
      </div>
    </div>
  );
}
