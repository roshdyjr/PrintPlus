"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import ProductItem from "./ProductItem";
import icon_Add_a_promo from "../../../public/cart/icon_Add_a_promo.svg";

export default function OrderSummary() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);
  const togglePromo = () => setShowPromo(!showPromo);

  return (
    <>
      {isOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={toggleOpen}
        />
      )}

      <div
        className={`bg-[#F8FAFC] rounded-t-xl p-6 z-50 transition-all duration-300 
          md:static md:block   md:rounded-xl md:w-[380px] 
          fixed bottom-0 left-0 w-full  border-t-2  md:border-none
          ${isOpen ? "h-[85vh] overflow-y-auto" : "h-16 overflow-hidden"} 
          md:h-auto md:overflow-visible`}
      >
        <div
          className="flex justify-between items-center mb-4 md:hidden cursor-pointer"
          onClick={toggleOpen}
        >
          <div className="flex items-center gap-2 text-[16px] font-[600] text-[#0F172A]">
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            {isOpen ? "Hide order summary" : "Show order summary"}
          </div>
          <span className="text-[16px] font-bold text-[#0F172A]">217 SAR</span>
        </div>

        <div className="hidden md:flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <span className="font-semibold">217 SAR</span>
        </div>

        {isOpen && (
          <div className="space-y-6">
            <ProductItem
              title="Gold business card"
              quantity={100}
              size="2 × 3.5”"
              edges="Round"
              foilColor="Gold"
              pdfLink="my personal card front design.pdf"
              total={114}
              express
            />

            <ProductItem
              title="Gold business card"
              quantity={50}
              size="2 × 3.5”"
              edges="Round"
              foilColor="Gold"
              pdfLink="my personal card front design.pdf"
              total={114}
            />

            {/* Promo Code Toggle */}
            <div>
              <div
                className="flex items-center justify-between gap-2 text-[14px] text-[#0F172A] mb-2 cursor-pointer font-[600]"
                onClick={togglePromo}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={icon_Add_a_promo}
                    alt="Promo icon"
                    width={24}
                    height={24}
                  />
                  Add a promo code
                </div>
                {showPromo ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </div>

              {showPromo && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter your promo code"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                  <button className="bg-[#0F172A] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#1E293B] transition">
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="mt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>217 SAR</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
